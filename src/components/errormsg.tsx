import { Alert } from "react-bootstrap";
const ErrorMsg = ({ErrMsg}:{ErrMsg:string}) => {
    return(
        <Alert  variant="danger">
            {ErrMsg}
        </Alert>
    )
}
export default ErrorMsg;