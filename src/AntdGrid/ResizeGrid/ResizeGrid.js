import { Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { columnsData } from '../../config/GridConfig';
import ResizeHeader from './ResizeHeader';
import './ResizeGrid.scss';
import ResizeCell from './CellComponent';
import { data } from '../../config/Mockdata';

const ResizeGrid = () => {
  const [columns, setColumns] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(0);
  let isDataFetched = false;

  const [isAutoFit, setIsAutoFit] = useState(false);
  const parentRef = useRef();
  const calcWidth = (val) => {
    let width = ((parentRef.current.offsetWidth * val) / 100) - 1;
    return width;
  };

  const fetchData = () => {
    const len=dataList.length;
    const temp = data.map((item, index) => ({ ...item, key: `${len+index+1}`,
    job: `${len+index+1}-${item.job}`,}));

    setDataList([...dataList, ...temp]);
    setPage(page + 1);
  };

  useEffect(() => {
    isDataFetched = false;
  }, [dataList]);

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
    fetchData();
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
      cell: ResizeHeader,
    },
    body: {
      cell: ResizeCell,
    }
  };

  const infiniteScroll = () => {
    // console.log('1 -', parentRef.current.scrollHeight);
    // console.log('2 -', parentRef.current.scrollTop);
    // console.log('3 -',parentRef.current.offsetHeight);

    if (!isDataFetched && parentRef.current.scrollHeight - parseInt(parentRef.current.scrollTop + parentRef.current.offsetHeight) < 10){
      isDataFetched = true;
      fetchData();
    }
  };

  return (
    <div ref={parentRef} className={isAutoFit ? "resizeGrid autofit" : "resizeGrid"} onScroll={infiniteScroll}>
      <Table dataSource={dataList} columns={tableCols} pagination={false} bordered components={components} 
      tableLayout='auto'
      />
    </div>
  );
};

export default ResizeGrid;