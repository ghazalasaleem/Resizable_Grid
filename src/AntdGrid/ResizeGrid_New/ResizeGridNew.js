import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { columnsData } from '../../config/GridConfig';
import ResizeHeader from './Header';
import './ResizeGridNew.scss';
// import ResizeCell from './Cell';
import { data } from '../../config/Mockdata';
import { VList } from "virtuallist-antd";


const TestGrid = () => {
  const [columns, setColumns] = useState([]);
  const [isAutoFit, setIsAutoFit] = useState(false);

  const calcWidth = (val) => {
    let width = ((window.innerWidth * val) / 100) - 1;
    return width;
  };

  const autooo = '';

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
            minWidth: autooo,
            width: autooo
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
            minWidth: autooo,
            width: autooo
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
    ...VList({
      height: 500
    }),
    header: {
      cell: ResizeHeader,
    },
    // body: {
    //   cell: ResizeCell,
    // }
  };
  return (
    <div className={isAutoFit ? "resizeGridNew autofit" : "resizeGridNew"}>
      <Table dataSource={data} columns={tableCols} pagination={false} bordered components={components} 
      tableLayout='auto'
      scroll={{ 
        y: 500,
        // x: 'max-content'
       }}
      />
    </div>
  );
};

export default TestGrid;