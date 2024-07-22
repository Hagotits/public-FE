import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { getUserActiveSells } from "../../../services/userData"; // 함수 import

function ActiveSells({ params, history }) {
  const [products, setProduct] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (params._id) {
      getUserActiveSells(params._id)
        .then(res => {
          setProduct(res.sells);
          setLoading(false);
        })
        .catch(err => console.log(err));
    }
  }, [params._id]);

  return (
    <>
      {!loading ? (
        <>
          <h1 className="heading">Active Sells</h1>
          {products.length > 0 ? (
            <Row>
              {products
                .filter(x => x.soldout === false)
                .map(x => (
                  <Col xs={12} md={6} lg={4} key={x._id.toString()}>
                    <ProductCard params={x} />
                  </Col>
                ))
              }
            </Row>
          ) : (
            <p className="nothing-to-show">판매 중인 상품이 없습니다.</p>
          )}
        </>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
}

export default ActiveSells;