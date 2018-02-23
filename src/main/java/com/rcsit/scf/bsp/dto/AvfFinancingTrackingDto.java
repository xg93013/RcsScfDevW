package com.rcsit.scf.bsp.dto;

import com.rcsit.scf.bsp.model.avf.AvfAccountsRecTraNotice;
import com.rcsit.scf.bsp.model.avf.AvfFinancingDemandHead;

import java.util.ArrayList;
import java.util.List;

/**
 * 融资跟踪对象
 * Created by hmily on 2017/8/22.
 */
public class AvfFinancingTrackingDto extends AvfFinancingDemandHead{

    List<AvfFinancingRPDto> avfAccountsRPInfos = new ArrayList<>();

    AvfAccountsRecTraNotice notice = new AvfAccountsRecTraNotice();

    public List<AvfFinancingRPDto> getAvfAccountsRPInfos() {
        return avfAccountsRPInfos;
    }

    public void setAvfAccountsRPInfos(List<AvfFinancingRPDto> avfAccountsRPInfos) {
        this.avfAccountsRPInfos = avfAccountsRPInfos;
    }

    public AvfAccountsRecTraNotice getNotice() {
        return notice;
    }

    public void setNotice(AvfAccountsRecTraNotice notice) {
        this.notice = notice;
    }
}
