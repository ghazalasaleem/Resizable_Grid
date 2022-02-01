import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { columnsData } from '../../config/GridConfig';
import TestHeader from './TestHeader';
import './TestGrid.scss';
import TestCell from './TestCell';
import { data } from '../../config/Mockdata';

const TestGrid = () => {
  const [columns, setColumns] = useState([]);
  const [isAutoFit, setIsAutoFit] = useState(false);

  const calcWidth = (val) => {
    let width = ((window.innerWidth * val) / 100) - 1;
    return width;
  };

  const rerenderTable = (colConfig, isAuto, key) => {
    const totalWidthInPercentage = colConfig.reduce((a, c) => {
      return a + c.widthInPercentage;
    }, 0);
    const colList = colConfig.map((col) => {
      const newWidthPx = calcWidth((col.widthInPercentage / totalWidthInPercentage) * 100);
      const newWidth = newWidthPx < col.minWidthConfig ? col.minWidthConfig : newWidthPx
      let config = {};
      if (col.key === key) {
        if (isAuto) {
          setIsAutoFit(true);
          config = {
            isFixed: true,
            ellipsis: false,
            minWidth: '',
            width: ''
          };
        } else {
          config = {
            isFixed: false,
            ellipsis: true,
            minWidth: newWidth,
            width: newWidth
          };
        }
      }
      else {
        if(col.isFixed) {
          setIsAutoFit(true);
          config = {
            ellipsis: false,
            minWidth: '',
            width: ''
          };
        } else {
          config = {
            ellipsis: true,
            minWidth: col.minWidth || newWidth,
            width: col.width || newWidth
          };
        }
      }

      return ({
        ...col,
        ...config
      });
    });
    setColumns(colList);
  };
  const checkAutoFit = (colData) => {
    let flag = false;
    colData.forEach(element => {
      if (element.isFixed || element.isResized) {
        flag = true;
      }
    });
    setIsAutoFit(flag);
  };

  useEffect(() => {
    checkAutoFit(columns);
  }, [columns]);

  useEffect(() => {
    rerenderTable(columnsData, false);
  }, []);  

  const handleClick = (key, isFixed) => {
    rerenderTable([...columns], isFixed, key);
  };

  const handleResize = (index) => (e, { size }) => {

    setColumns((prevState) => {
      const nextColumns = [...prevState];
      const resizeWidth = size.width < nextColumns[index].minWidthConfig? nextColumns[index].minWidthConfig : size.width;
      nextColumns[index] = {
        ...nextColumns[index],
        width: resizeWidth,
        minWidth: resizeWidth,
        isResized: true
      };
      return nextColumns;
    });
  };

  const tableCols = columns.map((col, index) => (
    {
      ...col,
      onHeaderCell: (column) => {
        if(column.isFixed) {
          return {
            onResize: handleResize(index),
            isFixed: column.isFixed
          };
        } else {
          return {
            minWidth: column.minWidth,
            maxWidth: column.width,
            onResize: handleResize(index),
            isFixed: column.isFixed
          };
        }
      },
      onCell: () => {
        if(col.isFixed) {
          return {
            isFixed: col.isFixed
          };
        } else {
          return {
            minWidth: col.minWidth,
            maxWidth: col.width,
            isFixed: col.isFixed
          };
        }
      },
      render: (label) => (<span onClick={() => handleClick(col.key, !col.isFixed)}>{label}</span>),
    }
  ));
  const components = {
    header: {
      cell: TestHeader,
    },
    body: {
      cell: TestCell,
    }
  };
  return (
    <div className={isAutoFit ? "resizeGrid autofit" : "resizeGrid"}>
      <Table dataSource={data} columns={tableCols} pagination={false} bordered components={components} />
    </div>
  );
};

export default TestGrid;