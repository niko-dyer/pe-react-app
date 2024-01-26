import { Component } from 'react';
import Sidebar from './Sidebar.js'
import "../../assets/scss/Header.scss";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography"; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

export default class Header extends Component<{ title: string }> { 

    render() {
        return (
            <>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Sidebar />
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Project Embrace
                            </Typography>
                            <a href="/login"><Button color="inherit">Logout</Button></a>
                        </Toolbar>
                    </AppBar>
                </Box>
                <div className="page-heading">
                    <Typography variant="h1">{ this.props.title }</Typography>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" to="/">
                            Root
                        </Link>
                        <Link
                            color="inherit"
                            to="/material-ui/getting-started/installation/"
                        >
                            Previous
                        </Link>
                        <Typography color="text.primary">Current</Typography>
                    </Breadcrumbs>
                </div>
            </>
        );
    }
}
