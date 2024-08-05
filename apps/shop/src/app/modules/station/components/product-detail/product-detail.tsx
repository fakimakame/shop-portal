import styles from './product-detail.module.scss';

/* eslint-disable-next-line */
export interface ProductDetailProps {}

export function ProductDetail(props: ProductDetailProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ProductDetail!</h1>
    </div>
  );
}

export default ProductDetail;
