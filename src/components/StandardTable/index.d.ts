import * as React from 'react'

interface StandardTableProps {
  dataSource: [],
  pagination: object,
  columns: object,
  rowKey: string,
  loading: boolean,
  bordered: boolean,
  showSelect: boolean,
  onChange: (pagination:object) => void,
  onSelectRow: (selectRows: []) => void
}

export default class StandardTable extends React.Component<StandardTableProps, any> {}
