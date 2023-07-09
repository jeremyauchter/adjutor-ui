import { Grid, Paper } from "@mui/material";
import React from "react";
import {ClassList} from "./Classes";


export default function Products(props: any) {
    return (
        <Grid container spacing={3}>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <ClassList />
            </Paper>
          </Grid>
        </Grid>
    );
}
