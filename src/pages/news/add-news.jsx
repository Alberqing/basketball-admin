import React, { Component } from 'react';
import PageContent from '@/layouts/page-content';
import LzEditor from 'react-lz-editor'
import config from '@/commons/config-hoc';
import { Form, Button, Input, Upload, Icon, message } from 'antd/lib/index';
import './style.less';

@config({
    path: '/add-news',
    // title: { local: 'add-artical', text: '新增文章', icon: 'read' },
    // breadcrumbs: [{ key: 'add-artical', local: 'add-artical', text: '文章管理中心', icon: 'read' }],
})

@Form.create()
export default class AddNews extends Component {
    state = {
        loading: false,
        htmlContent: '',
        fileList: [],
        imageUrl: '',
    }
    /** 
     * 富文本编辑
    */
    receiveHtml = (content) => {
        console.log("recieved HTML content", content);
        this.setState({
            fileList: [],
            htmlContent: content
        });
    }

    /**
     * 提交表单 
     * */
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    /**
     * 图片上传之前 
     * */
    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }

    /**
     * 图片处理
     */
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    /**
     * 选择图片
     */
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    render() {
        const { loading, htmlContent, imageUrl } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 21 },
            },
        };
        const upload = {
            name: 'file',
            action: "https://xxx.com.cn/MeetingPhoto",//上传接口，成功后返回该图片服务器地址
            listType: 'picture',
            headers: {
                authorization: 'authorization-text',
            },
            fileList: [...this.state.fileList],
            onSuccess: this.uploadSuccess,
            onChange: this.handleChange,
            supportServerRender: true,
            multiple: false,
            beforeUpload: this.beforeUpload,
            showUploadList: true
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <PageContent loading={loading}>
                <Button 
                    onClick={() => {this.props.history.goBack()}}
                    className="back-btn"
                >
                    <Icon type="left" />返回
                </Button>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item label='新闻标题' {...formItemLayout}>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入' }],
                            initialValue: '',
                        })(
                            <Input></Input>
                        )}
                    </Form.Item>
                    <Form.Item label='新闻图片' {...formItemLayout}>
                        {getFieldDecorator('src', {
                            rules: [{ required: true, message: '请输入图片地址' }],
                            initialValue: '',
                        })(
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={this.beforeUpload}
                                onChange={this.handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                            </Upload>
                        )}
                    </Form.Item>
                    <Form.Item label='提示' {...formItemLayout}>
                        {getFieldDecorator('prompt', {
                            rules: [{ required: true, message: '请输入文章提示' }],
                            initialValue: '',
                        })(
                            <Input></Input>
                        )}
                    </Form.Item>
                    <Form.Item label='作者' {...formItemLayout}>
                        {getFieldDecorator('author', {
                            rules: [{ required: true, message: '请输入作者' }],
                            initialValue: '',
                        })(
                            <Input></Input>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='新闻内容'>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <LzEditor
                                active={true}
                                importContent={htmlContent}
                                cbReceiver={this.receiveHtml}
                                uploadProps={upload}
                                video={false}
                                audio={false}
                                lang="ch"
                            />
                        )}
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="submit-btn"
                    >
                        提交
                    </Button>
                </Form>
            </PageContent>
        )
    }
}
