package com.rcsit.scf.bsp.domain;

import java.io.Serializable;
import java.util.Collection;

/**
 * *************************************************************************************************
 * <p/>
 * 实现功能：表格分页返回数据
 * <p>
 * ------------------------------------------------------------------------------------------------
 * 版本          变更时间             变更人                     变更原因
 * ------------------------------------------------------------------------------------------------
 * 1.0.00      2017/4/5 15:11      陈飞(fly)                  新建
 * <p/>
 * *************************************************************************************************
 */
public class PageResult<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 当前页码
     */
    private int page = 1;
    /**
     * 总条数
     */
    private long records;
    /**
     * 总页数
     */
    private int total;
    /**
     * 当前页数据
     */
    private Collection<T> rows;

    public PageResult() {
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public long getRecords() {
        return records;
    }

    public void setRecords(long records) {
        this.records = records;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public Collection<T> getRows() {
        return rows;
    }

    public void setRows(Collection<T> rows) {
        this.rows = rows;
    }
}
