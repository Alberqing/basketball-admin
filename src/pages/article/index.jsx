import React, { Component } from 'react';
import { Table } from 'antd';
import {
    QueryBar,
    QueryItem,
    Pagination,
    ToolBar,
    Operator
} from "@/library/antd";
import PageContent from '@/layouts/page-content';
import config from '@/commons/config-hoc';

@config({
    path: '/article',
    title: { local: 'artical', text: '文章管理中心', icon: 'read' },
    breadcrumbs: [{ key: 'artical', local: 'artical', text: '文章管理中心', icon: 'read' }],
})

export default class Article extends Component {
    state = {
        dataSource: [],
        total: 100,
        pageSize: 10,
        pageNum: 1,
        loading: false,
    }
    columns = [
        { title: '文章标题', dataIndex: 'title' },
        { title: '提示', dataIndex: 'prompt' },
        { title: '图片', dataIndex: 'src' },
        { title: '创建时间', dataIndex: 'time' },
        { title: '作者', dataIndex: 'author' },
        { title: '内容', dataIndex: 'content' },
        { title: '点赞数量', dataIndex: 'like' },
        { title: '阅读量', dataIndex: 'collection' },
        {
            title: '操作',
            key: 'operator',
            render: (text, record) => {
                const {id, customerNo} = record;
                const successTip = `删除“${customerNo}”成功！`;
                const items = [
                    {
                        label: '修改',
                        onClick: () => {
                            this.handleEdit(id);
                        },
                    },
                    {
                        label: '删除',
                        color: 'red',
                        confirm: {
                            title: `您确定要删除“${customerNo}”？`,
                            onConfirm: () => {
                                this.setState({loading: true});
                                this.props.ajax
                                    .del(`/user-center/${id}`, null, {successTip})
                                    .then(() => this.handleSearch())
                                    .finally(() => this.setState({loading: false}));
                            },
                        },
                    },
                    {
                        label: '详情',
                        onClick: () => {
                            console.log('详情');
                        },
                    }
                ];

                return (<Operator items={items}/>);
            },
        },
    ];

    // TODO 查询条件
    queryItems = [
        [
            {
                type: 'input',
                field: 'title',
                label: '文章标题',
            },
            {
                type: 'input',
                field: 'userNo',
                label: '文章内容',
            },
            {
                type: 'date-time',
                field: 'time',
                label: '创建时间',
            },
        ],
    ];

    // TODO 顶部工具条
    toolItems = [
        {
            type: 'primary',
            text: '新增',
            icon: 'plus',
            onClick: () => {
                // TODO
                this.props.history.push('/add-article');
            },
        },
    ];
    /**
     * 编辑
     * */
    handleEdit = () => {
        console.log('编辑');
        this.props.history.push('./add-article');
    }

    render() {
        const { dataSource, total, pageNum, pageSize, loading } = this.state;
        return (
            <PageContent loading={loading}>
                <QueryBar>
                    <QueryItem
                        loadOptions={this.fetchOptions}
                        items={this.queryItems}
                        onSubmit={params => this.setState({params}, this.handleSearch)}
                    />
                </QueryBar>

                <ToolBar items={this.toolItems} />
                <Table
                    columns={this.columns}
                    dataSource={dataSource}
                    rowKey="id"
                    pagination={false}
                />

                <Pagination
                    total={total}
                    pageNum={pageNum}
                    pageSize={pageSize}
                    onPageNumChange={pageNum => this.setState({ pageNum }, this.handleSearch)}
                    onPageSizeChange={pageSize => this.setState({ pageSize, pageNum: 1 }, this.handleSearch)}
                />
            </PageContent>
        )
    }
}
