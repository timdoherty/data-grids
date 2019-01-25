import React from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";

import mock_data from "../../mocks/MOCK_DATA.js";

class KendoReact extends React.Component {
  constructor() {
    super();

    this.state = this.createAppState({
      take: 20,
      skip: 0,
      sort: [{ field: "first_name", dir: "asc" }],
      group: [{ field: "car_make" }]
    });
  }

  columns = Object.keys(mock_data[0]).map(key => ({
    key: key,
    title: this.toTitle(key)
  }));

  aggregates = [
    { field: "amount", aggregate: "sum" },
    { field: "amount", aggregate: "average" }
  ];

  toTitle(key) {
    return key
      .split("_")
      .map(word => {
        return word.charAt(0).toUpperCase() + word.substr(1, word.length - 1);
      })
      .join(" ");
  }

  createAppState(dataState) {
    console.log("Creating New App State");
    const groups = dataState.group;
    if (groups) {
      groups.map(group => (group.aggregates = this.aggregates));
    }

    const newRows = process(mock_data, dataState);
    console.log(
      "New Rows:",
      newRows,
      " - First:",
      newRows.data[0].items[0].first_name
    );

    return {
      rows: newRows,
      dataState: dataState
    };
  }

  onDataStateChange = e => {
    console.log("DataState changed");
    this.setState(this.createAppState(e.data));
  };

  onExpandChange = e => {
    console.log("Expand changed");
    e.dataItem[e.target.props.expandField] = e.value;
    this.setState({
      rows: Object.assign({}, this.state.rows),
      dataState: this.state.dataState
    });
  };

  onPageChange = e => {
    console.log(
      "Page changed",
      e.page.skip,
      e,
      " - Change:",
      e.page.skip - this.state.dataState.skip
    );
    const newDataState = { ...this.state.dataState, skip: e.page.skip };
    this.setState(this.createAppState(newDataState));
  };

  render() {
    return (
      <div>
        <Grid
          style={{ height: "500px" }}
          data={this.state.rows}
          {...this.state.dataState}
          resizable={true}
          reorderable={true}
          sortable={true}
          pageSize={this.state.pageSize}
          groupable={{ footer: "visible" }}
          scrollable="virtual"
          expandField="expanded"
          onPageChange={this.onPageChange}
          onExpandChange={this.onExpandChange}
          onDataStateChange={this.onDataStateChange}
        >
          {this.columns.map(column => (
            <Column key={column.key} field={column.key} title={column.title} />
          ))}
        </Grid>
      </div>
    );
  }
}

export default KendoReact;
