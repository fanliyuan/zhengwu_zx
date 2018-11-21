import * as React from 'react'

export interface SearchFormProps {
  isChanged: boolean;
  formOptions: object;
  onChange?: any;
}

export default class SearchForm extends React.Component<SearchFormProps, any> {}