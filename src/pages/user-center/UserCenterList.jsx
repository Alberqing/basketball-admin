import React, {Component} from 'react';
import {Table} from 'antd';
import {
    QueryBar,
    QueryItem,
    Pagination,
    Operator,
} from "@/library/antd";
import PageContent from '@/layouts/page-content';
import config from '@/commons/config-hoc';
import UserCenterEdit from './UserCenterEdit';

@config({
    path: '/user-center',
    ajax: true,
})
export default class UserCenterList extends Component {
    state = {
        loading: false,
        dataSource: [],
        total: 0,
        pageSize: 10,
        pageNum: 1,
        params: {},
        id: void 0,
        visible: false,
    };

    // TODO 查询条件
    queryItems = [
        [
            {
                type: 'input',
                field: 'name',
                label: '用户名',
            },
            {
                type: 'input',
                field: 'sex',
                label: '性别',
            },
            {
                type: 'input',
                field: 'local',
                label: '地区',
            },
        ],
    ];

    columns = [
        {title: 'openId', dataIndex: 'openId'},
        {title: '用户昵称', dataIndex: 'name'},
        {title: '性别', dataIndex: 'sex'},
        {title: '地区', dataIndex: 'local'},
        {title: '', dataIndex: 'payFlg'},
        {
            title: '操作',
            key: 'operator',
            render: (text, record) => {
                const {id, customerNo} = record;
                const successTip = `删除“${customerNo}”成功！`;
                const items = [
                    {
                        label: '点赞文章',
                        onClick: () => {
                            this.handleEdit(id);
                        },
                    },
                    {
                        label: '收藏文章',
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
                        label: '故事列表',
                        onClick: () => {
                            this.handleEdit(id);
                        },
                    },
                ];

                return (<Operator items={items}/>);
            },
        },
    ];

    componentDidMount() {
        this.handleSearch();
    }

    handleSearch = () => {
        const {params, pageNum, pageSize} = this.state;

        this.setState({loading: true});
        this.props.ajax
            .get('/mock/user-center', {...params, pageNum, pageSize})
            .then(res => {
                console.log(res);
                if (res) {
                    const {list: dataSource, total} = res;
                    this.setState({
                        dataSource,
                        total,
                    });
                }
            })
            .finally(() => this.setState({loading: false}));
    };

    handleAdd = () => {
        this.setState({id: void 0, visible: true});
    };

    handleEdit = (id) => {
        this.setState({id, visible: true});
    };

    render() {
        const {
            loading,
            dataSource,
            total,
            pageNum,
            pageSize,
            visible,
            id,
        } = this.state;

        return (
            <PageContent loading={loading}>
                <QueryBar>
                    <QueryItem
                        loadOptions={this.fetchOptions}
                        items={this.queryItems}
                        onSubmit={params => this.setState({params}, this.handleSearch)}
                    />
                </QueryBar>

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
                    onPageNumChange={pageNum => this.setState({pageNum}, this.handleSearch)}
                    onPageSizeChange={pageSize => this.setState({pageSize, pageNum: 1}, this.handleSearch)}
                />

                <UserCenterEdit
                    id={id}
                    visible={visible}
                    onOk={() => this.setState({visible: false})}
                    onCancel={() => this.setState({visible: false})}
                />
            </PageContent>
        );
    }
}
