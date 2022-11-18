import { useParams,Route, Link,useRouteMatch } from "react-router-dom"
import { Fragment,useEffect } from "react"
import Comments from "../components/comments/Comments"
import HighlightedQuote from "../components/quotes/HighlightedQuote"
import LoadingSpinner from "../components/UI/LoadingSpinner"
import useHttp from "../hooks/use-http"
import { getSingleQuote } from "../lib/api"

const QuoteDetails=()=>{
  const params=useParams()
  const match=useRouteMatch()
  const {quoteId}=params

  const{sendRequest,status,data:loadedQuote,error}=useHttp(getSingleQuote,true)

  useEffect(()=>{
    sendRequest(quoteId)
  },[sendRequest])

  if(status==="pending"){
    return(
      <div className="centered">
        <LoadingSpinner/>
      </div>
    )
  }

  if(error){
    return(
      <div className="centered">{error}</div>
    )
  }

  if(!loadedQuote.text){
    return<p>No Quote found</p>
  }
  return(
    <Fragment>
    <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
    <Route path={`/quotes/${params.quoteId}`} exact>
    <div className='centered'>
      <Link className="btn--flat" to={`${match.url}/comments`}>
       Load Comments
      </Link>
    </div>
    </Route>
    <Route path={`${match.url}/comments`}>
      <Comments/>
    </Route>
    </Fragment>
  )
}
export default QuoteDetails