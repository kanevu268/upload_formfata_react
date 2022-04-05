import { Component } from "react";
const axios = require('axios');

class FileUpload extends Component {

    custom_file_upload_url = `http://localhost:5000/controller/upload`;
    config = {
        onUploadProgress: progressEvent => {
            let in_pro = true
            console.log(this.state.total_size - progressEvent.loaded)
            if (this.state.total_size - progressEvent.loaded < 0) {
                in_pro = false
            }
            this.setState({ inProgess: in_pro, progress: (progressEvent.loaded / this.state.total_size) * 100 })

        }
    }
    constructor(props) {
        super(props);
        this.state = {
            list_file: [],
            list_preview: [],
            adm_Attachment: { DESCRIPTION: '' },
            progress: '0',
            inProgess: false,
            total_size: 0
        }
    }

    handleImagePreview = (e) => {
        // let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let new_arr = Array.from(e.target.files)
        this.setState({
            list_file: new_arr,
            total_size: new_arr.map(c => c.size).reduce((a, b) => a + b, 0)
        }, () => console.log(this.state.total_size))
    }


    handleSubmitFile = async () => {

        if (this.state.image_file !== null) {

            let formData = new FormData();

            this.state.list_file.forEach(item => {
                formData.append('Files', item);
            });
            formData.append('DESCRIPTION', this.state.adm_Attachment.DESCRIPTION);

            const response = await axios.post(
                this.custom_file_upload_url,
                formData,
                this.config
            )
            // const response = await fetch(this.custom_file_upload_url, {
            //     method: 'POST',
            //     body: formData
            // });
            const data = response.data;

            if (data.success) {
                let new_list = [...this.state.list_preview].concat(data.data)
                this.setState({
                    list_preview: new_list
                })

            } else {
                alert("err")
            }



        }
    }


    render() {
        const { progress } = this.state
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', paddingTop: '50px' }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "300px" }}>
                    <input
                        type="file"
                        multiple
                        onChange={this.handleImagePreview}
                    />
                    <label>{this.state.total_size}</label>

                </div>
                <div style={{ display: "flex", justifyContent: "space-between", width: "300px" }}>
                    <label>DESCRIPTION</label>
                    <input
                        type="text"
                        onChange={e => {
                            this.state.adm_Attachment.DESCRIPTION = e.target.value
                            this.setState({})
                        }
                        } />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", width: "300px" }}>
                    {
                        this.state.inProgess ?
                            <progress id="file" value={progress} max="100"> {progress} % </progress> :
                            <div></div>
                    }
                    <input type="submit" onClick={this.handleSubmitFile} value="Submit" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", width: "300px" }}>
                    File link:
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", width: "300px" }}>
                    <ul>
                        {
                            this.state.list_preview.map((item, index) =>
                                <li>
                                    <a href="#">{item}</a>
                                </li>
                            )
                        }

                    </ul>

                </div>

            </div >
        );
    }
}

export default FileUpload;