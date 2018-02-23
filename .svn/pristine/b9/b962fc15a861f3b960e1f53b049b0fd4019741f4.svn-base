package com.rcsit.scf.bsp.domain;


import com.rcsit.scf.bsp.domain.enums.InputType;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;


/**
 * Created by wangdayin on 2017/4/17.
 */
public class Domain implements Serializable {
    //ID
    private String id;
    //排序序号
    private int sequence = 0;
    //创建时间
    private Date createTime=new Date();
    //更新时间
    private Date editTime = new Date();
    //修改者
    private String editor;
    //创建者
    private String creator;
    //是否删除
    private int deleted = 0;
    //修改者ID
    private String editorId;
    //创建者ID
    private String creatorId;
    //uuid
    private String uuid = UUID.randomUUID().toString();
    //录入方式
    private InputType inputType = InputType.H;
    //录入方式描述
    private String inputTypeText;

    public String getInputTypeText() {
        return getInputType().getText();
    }

    public void setInputTypeText(String inputTypeText) {
        this.inputTypeText = inputTypeText;
    }

    public InputType getInputType() {
        return inputType;
    }

    public void setInputType(InputType inputType) {
        this.inputType = inputType;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getId() {
        return  id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getEditTime() {
        return editTime;
    }

    public void setEditTime(Date editTime) {
        this.editTime = editTime;
    }

    public String getEditor() {
        return editor;
    }

    public void setEditor(String editor) {
        this.editor = editor;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public int getDeleted() {
        return deleted;
    }

    public void setDeleted(int deleted) {
        this.deleted = deleted;
    }

    public String getEditorId() {
        return editorId;
    }

    public void setEditorId(String editorId) {
        this.editorId = editorId;
    }

    public String getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }
}
