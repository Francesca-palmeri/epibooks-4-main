import { useEffect, useState } from "react"
import CommentList from "./CommentList"
import AddComment from "./AddComment"
import Loading from "./Loading"
import Error from "./Error"

const CommentArea = function (props) {
  const { comments, setComments } = useState([])
  const { isLoading, setIsLoading } = useState(false)
  const { isError, setIsError } = useState(false)
  /* state = {
    comments: [],
    isLoading: false,
    isError: false,
  } */

  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       'https://striveschool-api.herokuapp.com/api/comments/' +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization:
  //             'Bearer inserisci-qui-il-tuo-token',
  //         },
  //       }
  //     )
  //     console.log(response)
  //     if (response.ok) {
  //       let comments = await response.json()
  //       this.setState({ comments: comments, isLoading: false, isError: false })
  //     } else {
  //       console.log('error')
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({ isLoading: false, isError: true })
  //   }
  // }

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true) // Set loading state to true while fetching
      setIsError(false) // Reset error state

      try {
        let response = await fetch(
          "https://striveschool-api.herokuapp.com/api/comments/" + props.asin,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzBmYzA3ZGI3MzAwMTU0MDYzYWMiLCJpYXQiOjE3MzY4NjY5OTEsImV4cCI6MTczODA3NjU5MX0.AKNrvfgqZ0YM6Ga_Z_wLcGUQPnMGTsxQytDXnfnrtvk",
            },
          }
        )

        if (response.ok) {
          let data = await response.json()
          setComments(data) // Set the comments to state
        } else {
          setIsError(true) // If there's an error, set the error state
        }
      } catch (error) {
        console.error(error)
        setIsError(true) // If an error occurs during fetch, set error state
      } finally {
        setIsLoading(false) // Stop loading after the fetch attempt
      }
    }

    fetchComments() // Call the function to fetch comments when the component mounts or asin changes
  }, [props.asin]) // Dependency array: the effect will re-run when props.asin changes

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  )
}

export default CommentArea
