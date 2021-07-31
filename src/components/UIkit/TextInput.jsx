import { TextField } from "@material-ui/core";

const TextInput = (props) => {
    return(
        <TextField
            fullWidth={props.fullWidth} /*true:max*/
            label={props.label}
            margin='dense'
            multiline={props.multiline} /*複数行入力できるかどうか*/
            required={props.required} /*必須項目かどうか*/
            rows={props.rows} /*何行見せる？*/
            value={props.value} /*入力内容*/
            type={props.type} /*text, email, password*/
            onChange={props.onChange}
        />
    )
}

export default TextInput