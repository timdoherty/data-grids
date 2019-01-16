import React, { Component } from "react";
import ReactDataGrid from "react-data-grid";
import { Data } from "react-data-grid-addons";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Input from "@material-ui/core/Input";

import data from "../../mocks/MOCK_DATA.js";

class ReactDataGridDemo extends Component {
  constructor() {
    super();
    this.state = {
      rows: data,
      groupBy: ["car_make"],
      expandedRows: {}
    };
  }

  onRowExpandToggle = ({ columnGroupName, name, shouldExpand }) => {
    let expandedRows = Object.assign({}, this.state.expandedRows);
    expandedRows[columnGroupName] = Object.assign(
      {},
      expandedRows[columnGroupName]
    );
    expandedRows[columnGroupName][name] = { isExpanded: shouldExpand };
    this.setState({ expandedRows: expandedRows });
  };

  onGroupByChanged = event => {
    console.log(event.target.value);
    this.setState({ groupBy: event.target.value });
  };

  render() {
    const defaultColumnProperties = {
      width: 160
    };

    const columns = [
      {
        key: "id",
        name: "ID"
      },
      {
        key: "first_name",
        name: "First Name"
      },
      {
        key: "last_name",
        name: "Last Name"
      },
      {
        key: "email",
        name: "Email"
      },
      {
        key: "phone",
        name: "Phone #"
      },
      {
        key: "car_make",
        name: "Car Make"
      },
      {
        key: "car_model",
        name: "Car Model"
      },
      {
        key: "car_year",
        name: "Car Year"
      },
      {
        key: "car_color",
        name: "Car Color"
      },
      {
        key: "country",
        name: "Country"
      },
      {
        key: "date",
        name: "Date"
      },
      {
        key: "username",
        name: "Username"
      },
      {
        key: "description",
        name: "Description"
      },
      {
        key: "amount",
        name: "Amount"
      },
      {
        key: "buzzword",
        name: "Buzzword"
      },
      {
        key: "boolean",
        name: "Boolean"
      }
    ].map(c => ({ ...c, ...defaultColumnProperties }));

    const { rows, groupBy } = this.state;
    const groupedRows = Data.Selectors.getRows(this.state);
    console.log({ groupedRows });

    return (
      <div>
        <Select
          multiple
          value={this.state.groupBy}
          onChange={this.onGroupByChanged}
          input={<Input id="select-multiple-checkbox" />}
          renderValue={selected => selected.join(", ")}
        >
          {columns.map(column => (
            <MenuItem key={column.name} value={column.key}>
              <Checkbox checked={this.state.groupBy.includes(column.key)} />
              <ListItemText primary={column.name} />
            </MenuItem>
          ))}
        </Select>
        <ReactDataGrid
          columns={columns}
          rowGetter={i => groupedRows[i]}
          rowsCount={groupedRows.length}
          minHeight={650}
          enableCellAutoFocus={false}
          onRowExpandToggle={this.onRowExpandToggle}
          overScan={{ rowsStart: 15, rowsEnd: 15 }}
        />
      </div>
    );
  }
}

export default ReactDataGridDemo;
