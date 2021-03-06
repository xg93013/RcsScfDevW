package com.rcsit.scf.bsp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by wangdayin on 2017/4/18 0018.
 */
@ControllerAdvice
public class DefaultExceptionHandler {
    /**
     *  异常统一处理
     * <p/>
     *
     */
    @ExceptionHandler({MessageRuntimeException.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ModelAndView processUnauthenticatedException(NativeWebRequest request, MessageRuntimeException e) {
        ModelAndView mv = new ModelAndView();
        mv.addObject("msg", e.getMessage());
        mv.addObject("status", false);
        mv.setViewName("/error/500");
        return mv;
    }


    @ExceptionHandler({UserNameOrPasswordException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ModelAndView processUnauthenticatedAccessException(NativeWebRequest request, UserNameOrPasswordException e){
        ModelAndView mv = new ModelAndView();
        mv.addObject("msg", e.getMessage());
        mv.addObject("status", false);
        mv.setViewName("/login");
        return mv;
    }

    @ExceptionHandler({TokenErrorException.class})
    @ResponseStatus(HttpStatus.NETWORK_AUTHENTICATION_REQUIRED)
    public ModelAndView processUnauthenticatedTokenException(NativeWebRequest request, TokenErrorException e){
        ModelAndView mv = new ModelAndView();
        mv.addObject("msg", e.getMessage());
        mv.addObject("status", false);
        mv.setViewName("/login");
        return mv;
    }

}
