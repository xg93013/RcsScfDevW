package com.rcsit.scf.bsp.handler;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.rcsit.scf.bsp.constant.ServerConstant;
import com.rcsit.scf.bsp.dto.UraSysUserDto;
import com.rcsit.scf.bsp.exception.*;
import com.rcsit.scf.bsp.model.ura.UraSysIdentity;
import com.rcsit.scf.bsp.model.ura.UraSysUser;
import com.rcsit.scf.bsp.utils.HttpClientUtil;
import org.apache.commons.lang3.StringUtils;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Created by hmily on 2017/5/24.
 */

public class UraSysUserHandler {

    public UraSysUserDto doLogin(String loginName , String password){
        Map<String, String> param = new HashMap<>();
        param.put("loginName",loginName);
        param.put("password",password);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_URA_LOGIN, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        try{
        HttpClientUtil.isOk(jsonObject);
        }catch (Exception e){
            throw new UserNameOrPasswordException();
        }
        UraSysUserDto userDto = JSONObject.parseObject(jsonObject.getString("data"), new TypeReference<UraSysUserDto>() {});
        Optional.ofNullable(userDto).orElseThrow(DataErrorException::new);
        return userDto;
    }

    public List<UraSysIdentity> getIdentityList(){
        String result = HttpClientUtil.httpGets(ServerConstant.URL_URA_USER_IDENTITYLIST, "");
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        List<UraSysIdentity> identityList = JSONObject.parseObject(jsonObject.getString("data"), new TypeReference<List<UraSysIdentity>>(){});
        Optional.ofNullable(identityList).orElseThrow(DataErrorException::new);
        return identityList;

    }

    public UraSysUserDto loginWithIdentity(String token ,String identityId){
        Map<String, String> param = new HashMap<>();
        param.put("token",token);
        param.put("identityId",identityId);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_URA_USER_LOGINWITHIDENTITYID, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        UraSysUserDto userDto = JSONObject.parseObject(jsonObject.getString("data"), new TypeReference<UraSysUserDto>(){});
        Optional.ofNullable(userDto).orElseThrow(DataErrorException::new);
        return userDto;

    }

    public void logout(String token){
        Map<String, String> param = new HashMap<>();
        param.put("token",token);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_URA_USER_LOGOUT, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        if (!HttpClientUtil.isOk(jsonObject))
            throw new TokenErrorException();
    }

    public void changePsw(String token , String oldPsw , String newPsw){
        Map<String, String> param = new HashMap<>();
        param.put("token",token);
        param.put("oldPsw",oldPsw);
        param.put("newPsw",newPsw);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_URA_USER_CHANGEPSW, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
    }

    /**
     * 获取当前登录用户
     * @param token
     * @return
     */
    public UraSysUser getCurrentUserInfo(String token){
        String result = HttpClientUtil.httpGets(ServerConstant.URL_URA_USER_CURRENTUSERINFO, "token=" + token);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return JSONObject.parseObject(jsonObject.getString("data"),new TypeReference<UraSysUser>(){});
    }
}
