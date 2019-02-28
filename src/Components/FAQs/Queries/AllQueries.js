import React from 'react'
import { map } from 'ramda'
import { Divider, Card, Button, Icon } from 'antd'

const AllQueries = (props) => {
  const { queries, deleteQuery } = props
  const queriesJSX = map((query) =>
    (<div key={query.id}>
      <Card
        type="inner"
        title={query.question}
        key={query.id}
        extra={<Button
              onClick={deleteQuery}
              id={query.id}
            >
              <Icon type="cross" />
            </Button>}
      >
        {query.answer}
      </Card>
      <br />
    </div>
    ), queries)
  return (
    <div>
      <Divider>Frequently Asked Questions</Divider>
      {queriesJSX}
    </div>
  );
};

export default AllQueries