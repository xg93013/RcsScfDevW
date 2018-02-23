<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"
         contentType="text/html; charset=UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path;
%>
<!DOCTYPE html>
<html style="background:#F4F4F4;height: 100%; ">
<head>
    <link href="<%=basePath%>/static/images/title_logo.ico"
          rel="shortcut icon">
    <link rel="stylesheet" type="text/css"
          href="<%=basePath%>/static/EUI/jqgrid/css/jquery-ui.min.css">
    <link rel="stylesheet" type="text/css"
          href="<%=basePath%>/static/EUI/jqgrid/css/ui.jqgrid.min.css">
    <link rel="stylesheet" type="text/css"
          href="<%=basePath%>/static/EUI/eui.css">

    <script type="text/javascript"
            src="<%=basePath%>/static/EUI/jquery-1.8.min.js"></script>
    <script type="text/javascript"
            src="<%=basePath%>/static/EUI/eui.js"></script>
    <script type="text/javascript"
            src="<%=basePath%>/static/EUI/eui_zh-cn.js"></script>
    <script type="text/javascript"
            src="<%=basePath%>/static/EUI/jqgrid/jquery.jqGrid.min.js"></script>

    <script type="text/javascript">
        var _ctxPath = "<%=basePath%>";
        EUI.onReady(function () {
            $(document).bind("keypress", function (event) {
                if (event.keyCode == 8) {
                    if (event.target.tagName.toLowerCase() == "body") {
                        return false;
                    }
                }
            });
        });
    </script>
</head>
</html>
