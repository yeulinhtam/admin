import { Button, Grid, Paper, Switch, TextField, Typography, FormHelperText, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import cyan from '@material-ui/core/colors/cyan';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';
import { useDispatch } from 'react-redux';
import { createPostRequest, createPostSuccess, createPostError } from '../../actions/post';
import postApi from '../../api/postApi';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: cyan[700],
        },
        secondary: {
            main: '#f44336',
        },
    },
});

const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        matchVisual: false,
    }
}

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paperRoot: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        borderRadius: 15
    },
    btnRoot: {
        padding: 10,
        borderRadius: 10,
        width: "100%"
    }
}));

let schema = yup.object().shape({
    title: yup.string().required('Title is a required field'),
    description: yup.string().required('Decripton is a required field'),
    body: yup.string().required('Body is a required field'),
    category: yup.string().required('Category is a required'),
    file: yup.mixed().required('File is a required field'),
    publish: yup.boolean().required(),
    enableComments: yup.boolean().required(),
    metaTitle: yup.string().required('Meta title is a required field'),
    metaDescription: yup.string().required('Meta description is a required field')
});


function CreatePost(props) {
    const { categories } = props;
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            title: '',
            category: '0',
            description: '',
            body: '',
            file: null,
            publish: true,
            enableComments: true,
            metaTitle: '',
            metaDescription: ''
        },
        validationSchema: schema,
        onSubmit: (values, { setSubmitting, setFieldError }) => {

            let data = new FormData();
            data.append('file',values.file);
            data.append('title',values.title);
            data.append('description',values.description);
            data.append('body',values.body);
            data.append('author',"60d83f03047d2d351cdc9109");
            data.append('publish',values.publish);
            data.append('enableComments',values.enableComments);
            data.append('metaTitle',values.metaTitle);
            data.append('metaDescription',values.metaDescription);  

            dispatch(createPostRequest())
            // console.log(values);
            postApi.create(data).then(res => {
                console.log(res)
            }).catch( err => {
                console.log(err)
            })
        }
    })

    const savePost = () => {
      
    }

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = (file) => {
        if (!file) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(file)
    }
    return (
        <ThemeProvider theme={theme}>
            <Grid container className={classes.root}>
                <form style={{ display: 'contents' }} onSubmit={formik.handleSubmit}>
                    <Grid item lg={7}>
                        <Paper className={classes.paperRoot}>
                            <Grid className="app" container spacing={3} direction="column">
                                <Grid item lg={12}>
                                    <TextField
                                        label="Post title"
                                        variant="outlined"
                                        name="title"
                                        value={formik.values.title}
                                        error={formik.touched.title && Boolean(formik.errors.title)}
                                        helperText={formik.touched.title && formik.errors.title}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth />
                                </Grid>
                                <Grid item lg={12}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="demo-simple-select-outlined-label">Select category</InputLabel>
                                        <Select
                                            id="demo-simple-select-outlined"
                                            labelId="demo-simple-select-outlined-label"
                                            label="Select category"
                                            name="category"
                                            onChange={(event) => {                               
                                                formik.setFieldValue("category", event.target.value);
                                            }}
                                        >
                                            {categories && categories.length ? categories.map((item) => {
                                                return <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                                            }) : null}
                                        </Select>
                                        <FormHelperText
                                            error={formik.touched.category && Boolean(formik.errors.category)}
                                            variant="outlined">
                                            {formik.touched.category && formik.errors.category}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={12}>
                                    <TextField
                                        label="Description"
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        name="description"
                                        value={formik.values.description}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth />
                                </Grid>
                                <Grid item lg={12}>
                                    <ReactQuill
                                        theme="snow"
                                        name="body"
                                        onChange={(value) => {
                                            formik.setFieldValue("body", value);
                                        }}

                                        modules={modules}
                                        formats={formats}
                                        bounds={'.app'}
                                        style={{ minHeight: '300px' }}
                                    />
                                    <FormHelperText
                                        error={formik.touched.body && Boolean(formik.errors.body)}
                                        variant="outlined">
                                        {formik.touched.body && formik.errors.body}
                                    </FormHelperText>
                                </Grid>
                                <Grid item lg={12}>
                                    {selectedFile && <img src={preview} alt="preview" height={200} width='100%' />}
                                </Grid>
                                <Grid item lg={12}>
                                    <TextField
                                        id="file"
                                        type="file"
                                        variant="outlined"
                                        name="file"
                                        onChange={(event) => {
                                            formik.setFieldValue("file", event.currentTarget.files[0]);
                                            onSelectFile(event.currentTarget.files[0])
                                        }}
                                        error={formik.touched.file && Boolean(formik.errors.file)}
                                        helperText={formik.touched.file && formik.errors.file}
                                        fullWidth />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item lg={5}>
                        <Paper className={classes.paperRoot}>
                            <Grid item container spacing={3} direction="column">
                                <Grid item lg={12} container justify="space-between" alignItems="center">
                                    <div>
                                        <Typography>Publish</Typography>
                                    </div>
                                    <div>
                                        <Switch
                                            checked={formik.values.publish}
                                            onChange={(event) => {
                                                formik.setFieldValue("publish", event.target.checked);
                                            }}
                                            color="primary"
                                            name="publish"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </div>
                                </Grid>
                                <Grid item lg={12} container justify="space-between" alignItems="center">
                                    <div>
                                        <Typography>Enable comments</Typography>
                                    </div>
                                    <div>
                                        <Switch
                                            checked={formik.values.enableComments}
                                            onChange={(event) => {
                                                formik.setFieldValue("enableComments", event.target.checked);
                                            }}
                                            color="primary"
                                            name="enableComments"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </div>
                                </Grid>
                                <Grid item lg={12}>
                                    <TextField
                                        label="Mate title"
                                        variant="outlined"
                                        name="metaTitle"
                                        value={formik.values.metaTitle}
                                        error={formik.touched.metaTitle && Boolean(formik.errors.metaTitle)}
                                        helperText={formik.touched.metaTitle && formik.errors.metaTitle}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth />
                                </Grid>
                                <Grid item lg={12}>
                                    <TextField
                                        label="Meta Description"
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        name="metaDescription"
                                        value={formik.values.metaDescription}
                                        error={formik.touched.metaDescription && Boolean(formik.errors.metaDescription)}
                                        helperText={formik.touched.metaDescription && formik.errors.metaDescription}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        fullWidth />
                                </Grid>
                                <Grid item lg={12} container justify="space-between">
                                    <Grid item lg={5}>
                                        <Button
                                            className={classes.btnRoot}
                                            fullWidth
                                            onClick={savePost}
                                            variant="contained"
                                            color="default">
                                            Review
                                        </Button>
                                    </Grid>
                                    <Grid item lg={5}>
                                        <Button
                                            className={classes.btnRoot}
                                            fullWidth
                                            type="submit"
                                            variant="contained"
                                            color="primary">
                                            Post
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </form>
            </Grid>
        </ThemeProvider>
    );
}

export default CreatePost;