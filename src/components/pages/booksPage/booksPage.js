import React, { Component } from 'react'
import {Col, Row} from 'reactstrap';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService'
import RowBlock from '../../rowBlock';
export default class BooksPage extends Component {
    gotService = new gotService();
    state = {
        selectedItem: null,
        error:false
    }
    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    }
    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const itemList = (
            <ItemList
                getData = {this.gotService.getAllBooks}
                onItemSelected={this.onItemSelected}
                renderItem = {({name, gender}) => `${name} (${gender})`}
            />
        )
        const charDetails = (
            <ItemDetails 
            getData = {this.gotService.getBook}
            itemId={this.state.selectedItem}>
            <Field field='gender' label='Gender'/>
            <Field field='born' label='Born'/>
            <Field field='died' label='Died'/>
            <Field field='culture' label='Culture'/> 
            </ItemDetails>
        )
        return (
            <RowBlock 
            left={itemList}
            right={charDetails}
            /> 
        )
    }
}
