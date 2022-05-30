import * as React from 'react';
import classNames from 'classnames';
import IconSpin from '@/assets/images/_global/IconSpin';
import { fadeConfig } from '../../config/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { cloneElement } from '../_util/reactNode';
import { ResetFactor } from '../_type/type';
import { Scrollbar } from '../index';
import { t } from '@lingui/macro';
import styled from 'styled-components';

const Wrapper = styled.div`
  .tbody {
    position: relative;
    .normal {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(255, 255, 255, 0.6);
      cursor: not-allowed;
    }
    .scroll {
      padding: 6px 0;
      span {
        margin-left: 8px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.8);
      }
    }
    .empty {
      padding-top: 20%;
      img {
        margin: 0 auto 28px auto;
        width: 128px;
        height: 128px;
      }
      h6 {
        width: 100%;
        height: 18px;
        text-align: center;
        font-size: 14px;
        line-height: 18px;
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
`;

interface TheadProps {
  fixed?: boolean;
}

interface TbodyProps {
  type?: 'start' | 'end';
  empty?: string;
  dataSource?: object[];
  scroll?: number;
  onMore?: (...args: any[]) => any;
}

type TableInstance = TheadProps & ResetFactor<TbodyProps, 'type' | 'dataSource'>;

export interface TableProps extends TableInstance {
  className?: string;
  children?: React.ReactNode;
}

const TableHead: React.FC<TheadProps> = ({ children, fixed }) => {
  return <ul className="thead row-between">{children}</ul>;
};

const TableBody: React.FC<TbodyProps> = (props) => {
  const { type, scroll, empty, dataSource, children, onMore } = props;

  const renderLoading = React.useMemo(() => {
    return (
      <AnimatePresence>
        {type === 'start' && (
          <motion.div className={`${scroll ? 'scroll' : 'normal'} row-center`.trimEnd()} {...fadeConfig}>
            <IconSpin size={scroll ? 16 : 38} color="#06ceab" />
            {scroll && <span>{t`loading`}…</span>}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }, [scroll, type]);

  const renderNormal = React.useMemo(() => {
    if (!dataSource) return null;
    return (
      <React.Fragment>
        {cloneElement(children)}
        {renderLoading}
        {type === 'end' && dataSource.length === 0 && (
          <div className="empty">
            <img src={require('@/assets/images/personal/interface/nodata.png')} alt="icon" />
            <h6>{empty ?? t`noData`}</h6>
          </div>
        )}
      </React.Fragment>
    );
  }, [children, dataSource, empty, renderLoading, type]);

  const renderScroll = React.useMemo(() => {
    return (
      <Scrollbar
        trackStyle={(horizontal) => ({ [horizontal ? 'height' : 'width']: 0, right: 2, border: 0 })}
        thumbStyle={(horizontal) => ({ [horizontal ? 'height' : 'width']: 3 })}
        trackGap={[4, 4, 4, 4]}
        onScroll={(e: React.UIEvent<HTMLDivElement>) => {
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
          if (scrollTop + clientHeight === scrollHeight) {
            console.log('I am on the bottom!');
            onMore?.();
          }
        }}
      >
        {renderNormal}
      </Scrollbar>
    );
  }, [onMore, renderNormal]);

  return (
    <ul className="tbody" style={{ height: scroll ?? 'auto' }}>
      {scroll ? renderScroll : renderNormal}
    </ul>
  );
};

const InternalTable = (props: TableProps, ref: any) => {
  const { className, children, ...rest } = props;

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
  const tableRef = (ref as any) || React.createRef<HTMLDivElement>();

  const classes = classNames(className, 'table');

  return (
    <Wrapper className={classes} ref={tableRef}>
      {React.Children.map(children, (ele, i) => i < 2 && cloneElement(ele, { ...rest }))}
    </Wrapper>
  );
};

const Table = React.forwardRef(InternalTable) as unknown as ((
  props: React.PropsWithChildren<TableProps>,
) => React.ReactElement) & { TableHead: typeof TableHead; TableBody: typeof TableBody };

Table.TableHead = TableHead;
Table.TableBody = TableBody;

export default Table;
