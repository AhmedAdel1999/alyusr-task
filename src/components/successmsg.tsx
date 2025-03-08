import { Alert } from "react-bootstrap";
const SuccessMsg = ({SuccessMsg}:{SuccessMsg:string}) => {
    return(
        <Alert  variant="success">
            {SuccessMsg}
        </Alert>
    )
}
export default SuccessMsg;