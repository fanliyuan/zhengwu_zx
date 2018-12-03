import * as React from 'react'

interface TypeOption {
  maxLength?: number,
  placeholder?: string,
  options?: object
}
interface FormData {
  name: string,
  type?: string,
  typeOptions?: object,
  children?: []
}

interface FormOptions {
  formData: FormData[],
  searchHandler: any,
  itemOptions?: object
}

export interface SearchFormProps {
  isChanged: boolean;
  formOptions: FormOptions;
  onChange?: ()=>void;
}

export default class SearchForm extends React.Component<SearchFormProps, any> {}