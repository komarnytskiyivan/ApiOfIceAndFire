import React, {Component} from 'react';
import './randomChar.css';
import '../../services/gotService'
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage'
export default class RandomChar extends Component {
    state = {
        char: {},
        loading:true,
        error: false
    }
    gotService = new GotService();
    componentDidMount(){
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 1500)
    }
    componentWillUnmount(){
        clearInterval(this.timerId)
    }
    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }
    onError = (err) => {
        this.setState({
            loading: false,
            error: true
        })
    }
    updateChar = () => {
        const id = Math.floor(Math.random() * Math.floor(80));
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }
    render() {
        const {char, loading, error } = this.state
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) ? <View char={char}/> : null
        const errorMessage = error ? <ErrorMessage/> : null
        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}
const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return(
        <div className="random-block rounded">
            <h4>Random Character: {name == '' ? 'No data :(' : name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender == '' ? 'No data :(' : gender }</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born == '' ? 'No data :(' : born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died == '' ? 'No data :(' : died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture == '' ? 'No data :(' : culture}</span>
                </li>
            </ul>
        </div>
    )
}