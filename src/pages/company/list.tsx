import CustomAvatar from '@/components/custom-avatar';
import { Text } from '@/components/text';
import { COMPANIES_LIST_QUERY } from '@/graphql/queries';
import { currencyNumber } from '@/utilities';
import { SearchOutlined } from '@ant-design/icons';
import { CreateButton, FilterDropdown, List, useTable } from '@refinedev/antd'
import { getDefaultFilter, useGo } from '@refinedev/core'
import { Input, Space, Table } from 'antd';


 export const CompanyList = () => {

  const go = useGo();

  const { tableProps, filters } = useTable({
    resource: 'companies',
    pagination: {
      pageSize: 12,
    },
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY
    }
  })

  return (
    <List
      breadcrumb={false}
      headerButtons={() => (
        <CreateButton 
          onClick={() => {
            go({
              to: {
                resource: 'companies',
                action: 'create'
              },
              options: {
                keepQuery: true
              },
              type: 'replace'
            })
          }}
        />
      )}
    >
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination
        }}
      >
        <Table.Column
          dataIndex="name"
          title="Company Title"
          defaultFilteredValue={getDefaultFilter('id', filters)}
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Company" />
            </FilterDropdown>
          )}
          render={(value, record) => (
            <Space>
              <CustomAvatar shape="square" name={record.name} src={record.avatarUrl} />
              <Text style={{ whiteSpace: 'nowrap'}}>
                {record.name}
              </Text>
            </Space>
          )}
        />
        <Table.Column
          dataIndex="totalRevenue"
          title="Open deals amount"
         // render={(value, record) => (
           // <Text>
             // {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
           // </Text>
         // )}
        />
      </Table>
    </List>
  )
}

