import Checkbox from '@material-ui/core/Checkbox';
import cyan from '@material-ui/core/colors/cyan';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, lighten, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import GetAppIcon from '@material-ui/icons/GetApp';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: cyan[700],
        },
        secondary: {
            main: 'rgb(0, 171, 85)',
        },
    },
});


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

function randomDate(start, end, startHour, endHour) {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date.toDateString();
}


const statusStyles = makeStyles((theme) => ({
    root: {
        height: 22,
        minWidth: 22,
        lineHeight: 0,
        borderRadius: 8,
        cursor: 'default',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        justifyContent: 'center',
        padding: '0px 8px',
        color: 'rgb(183, 33, 54)',
        fontSize: '0.75rem',
        fontFamily: "Public Sans, sans-serif",
        highlight:  theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
        },
        fontWeight: 700
    },
}));



const rows = [
    createData('Introducing JSX', 'React JS', randomDate(1,100,1,23), 'Block', 4.3),
    createData('Rendering Elements', 'React JS', randomDate(1,100,1,23), 'Open', 4.9),
    createData('Components and Props', 'React JS', randomDate(1,100,1,23), 'Pending', 6.0),
    createData('State and Lifecycle', 'Node JS', randomDate(1,100,1,23), 'Block', 4.0),
    createData('Handling Events', 'Javascript', randomDate(1,100,1,23), 'Pending', 3.9),
    createData('Conditional Rendering', 'React JS', randomDate(1,100,1,23), 'Open', 6.5),
    createData('Lists and Keys', 'Angular', randomDate(1,100,1,23), 'Open', 4.3),
    createData('Forms', 'React JS', randomDate(1,100,1,23), 'Open', 0.0),
    createData('Lifting State Up', 'React JS', randomDate(1,100,1,23), 'Open', 7.0),
    createData('Composition vs Inheritance', 'React JS', randomDate(1,100,1,23), 'Open', 0.0),
    createData('Higher-Order Components', 'React Native',randomDate(1,100,1,23), 'Open', 2.0),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Post' },
    { id: 'calories', numeric: true, disablePadding: false, label: 'Category' },
    { id: 'fat', numeric: true, disablePadding: false, label: 'Create at' },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'Status' },
    { id: 'protein', numeric: true, disablePadding: false, label: '' },
];

function LabelStatus(props){
    const {title } = props;
   
    const classes = statusStyles();

    return (
        <span className={clsx(classes.root, {
            [classes.highlight]: 4 > 0,
        })}>
            {title}
        </span>
    )
}

function EnhancedTableHead(props) {
   
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
   
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),

    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    icon: {
        minWidth: 100,
        marginRight: theme.spacing(1)
    }
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (

        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Posts
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <React.Fragment>
                 <Button startIcon={<FilterListIcon />} color="default" variant="contained" className={classes.icon}>
                     FILTER
                 </Button>
                 <Button
                     startIcon={<AddIcon />}
                     color="primary"
                     variant="contained"
                     className={classes.icon}>
                     Create
                 </Button>
                 <Button startIcon={<GetAppIcon />} color="secondary" variant="contained" className={classes.icon}>
                     Export
                 </Button>
                 </React.Fragment>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        margin: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.name);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.name}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                         onClick={(event) => handleClick(event, row.name)}
                                                        checked={isItemSelected}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" id={labelId} scope="row" padding="default">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="left">{row.calories}</TableCell>
                                                <TableCell align="left">{row.fat}</TableCell>
                                                <TableCell align="left">
                                                    <LabelStatus title={row.carbs} color="red"/>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <IconButton>
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: (80) * emptyRows + rowsPerPage }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </ThemeProvider>
        </div>
    );
}
