import ViewProduct from '../../components/view-product/view-product';
import styles from './product.module.scss';

/* eslint-disable-next-line */
export interface ProductProps {}

export function Product(props: ProductProps) {
  return (
    <div className={styles['container']}>
     <ViewProduct/>
    </div>
  );
}

export default Product;
