import './charInfo.scss';
// import thor from '../resources/img/thor.jpeg';

import { useState, useEffect } from 'react';
import useMarvelServices from '../services/MarvelService';
import setContent from '../utils/setContent';
import { Link } from 'react-router-dom';


const CharInfo = (props) => {

    const [char, setChar] = useState(null)
   
    const {loading, error, getCharacter, clearError, process, setProcess} = useMarvelServices()

    useEffect(() => {
        updateChar()
        
    }, [props.charId])

  

    const updateChar = () => {
        clearError()
        const {charId} = props
        if (!charId) {
            return 
        }
            getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded =(char) => {
        setChar(char)
    }

   


    // const skeleton = char || loading || error ? null : <Skeleton />
    // const errorMessage = error ? <ErrorMessage /> : null
    // const spinner = loading ? <Spinner/> : null
    // const content = !(loading || error || !char) ? <View char={char}/> : null

    return (
        <div className="char__info">
            {/* {skeleton}
            {errorMessage}
            {spinner}
            {content} */}
            {setContent(process, View, char)}
        </div>
    )
}


const View = ({data}) => {
    
    const {name, description, thumbnail, homepage, wiki, comics} = data

    let imgStyle = {'objectFit' : 'cover'}
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'}
    }

    
    return (
        <>
            <div className="char__basics">
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                     {(description === '' ? <p>This character have not description</p> : description )}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {
                        comics.length === 0 
                        ? <p>Comics not found</p>
                        :  comics.map((item, i) => {
                            if (i > 9) return
                            return (
                                <li key={i} 
                                    className="char__comics-item"
                                >
                                        
                                   <Link href="#"
                                        to={`/comics/${item.resourceURI.substring(43)}`}
                                    >
                                        {item.name} 
                                    </Link> 
                                </li>
                            )
                        })
                    }
                </ul>
        </>
    )
}


export default CharInfo;

// class CharInfo extends Component{
//     state = {
//         char: null,
//         loading: false,
//         error:false
//     }
//     marvelService = new MarvelServices()

//     componentDidMount() {
//         this.updateChar()
//     }

//     componentDidUpdate(prevProps) {
//         if(this.props.charId !== prevProps.charId) {
//             this.updateChar()
//         }

//     }

//     componentDidCatch(err, info) {
//         console.log(err, info)
//         this.setState({error: true})
//     }

//     updateChar = () => {
//         const {charId} = this.props
//         if (!charId) {
//             return 
//         }

//         this.onCharLoading()

//         this.marvelService
//             .getCharacter(charId)
//             .then(this.onCharLoaded)
//             .catch(this.onError)
//     }

//     onCharLoaded =(char) => {
//         this.setState({char, loading: false})
//     }

//     onCharLoading =() => {
//         this.setState({
//             loading: true
//         })
//     }

//     onError =() => {
//         this.setState({
//             loading: false, 
//             error: true})
//     }

//     render() {
//         const {char, loading, error} = this.state

//         const skeleton = char || loading || error ? null : <Skeleton />
//         const errorMessage = error ? <ErrorMessage /> : null
//         const spinner = loading ? <Spinner/> : null
//         const content = !(loading || error || !char) ? <View char={char}/> : null
//         return (
//             <div className="char__info">
//                 {skeleton}
//                 {errorMessage}
//                 {spinner}
//                 {content}
//             </div>
//         )

//     }
// }


// const View = ({char}) => {
    
//     const {name, description, thumbnail, homepage, wiki, comics} = char

//     let imgStyle = {'objectFit' : 'cover'}
//     if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
//         imgStyle = {'objectFit' : 'contain'}
//     }

    
//     return (
//         <>
//             <div className="char__basics">
//                     <img src={thumbnail} alt={name} style={imgStyle}/>
//                     <div>
//                         <div className="char__info-name">{name}</div>
//                         <div className="char__btns">
//                             <a href={homepage} className="button button__main">
//                                 <div className="inner">homepage</div>
//                             </a>
//                             <a href={wiki} className="button button__secondary">
//                                 <div className="inner">Wiki</div>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="char__descr">
//                      {(description === '' ? <p>This character have not description</p> : description )}
//                 </div>
//                 <div className="char__comics">Comics:</div>
//                 <ul className="char__comics-list">
//                     {
//                         comics.length === 0 
//                         ? <p>Comics not found</p>
//                         :  comics.map((item, i) => {
//                             if (i > 9) return
//                             return (
//                                 <li key={i} className="char__comics-item">
//                                     {item.name} 
//                                 </li>
//                             )
//                         })
//                     }
//                 </ul>
//         </>
//     )
// }


// export default CharInfo;