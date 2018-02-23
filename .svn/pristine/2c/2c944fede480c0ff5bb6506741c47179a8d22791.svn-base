package com.rcsit.scf.bsp.exception;


import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.multiaction.NoSuchRequestHandlingMethodException;
import org.springframework.web.servlet.mvc.support.DefaultHandlerExceptionResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by hmily on 2017/5/27.
 * spring  404异常处理
 */
public class CustomHandlerNotFoundExceptionResolver extends DefaultHandlerExceptionResolver {

    @Override
    protected ModelAndView doResolveException(HttpServletRequest request,
                                              HttpServletResponse response, Object handler, Exception ex) {
        if (ex instanceof NoHandlerFoundException || ex instanceof NoSuchRequestHandlingMethodException) {
            ModelAndView mv = new ModelAndView();
            mv.addObject("msg", ex.getMessage());
            mv.addObject("status", false);
            mv.setViewName("/error/404");
            return mv;
        }
        return super.doResolveException(request, response, handler, ex);
    }
}
