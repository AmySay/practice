$(function(){
    initFullCalendar();
    initForm();
    initDate();
})
 //页面加载完初始化日历   
var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();
var dataSource=[
                {
                    id:1,
                    title: '全天计划写代码',
                    start:  '2016-06-09',
                },
                {
                    id:2,
                    title: '张家界四日游',
                    start: '2016-06-07',
                    end: '2016-06-08',
                },
                {
                    id: 3,
                    title: '电话回访客户',
                    start: '2016-06-06',
                    allDay: false
                },
                {
                    id: 4,
                    title: '电话回访客户',
                    start: '2016-06-05',
                    allDay: false
                },
                {
                    id:5,
                    title: 'qwrdsf',
                    start: '2016-06-04',
                    allDay: false
                },
                {
                    id:6,
                    title: '中秋放假',
                    start: '2016-06-17',
                    end: '2016-06-19',
                },
                {
                    id:7,
                    title: 'qwer',
                    start: '2016-06-01',
                    end: '2016-06-02',
                    allDay: false
                },
                {
                    id:8,
                    title: '生日聚会',
                    start: '2016-06-11',
                    end: '2016-06-12',
                    allDay: false
                },
                {
                    id:9,
                    title: '访问Helloweba主页',
                    start: '2016-06-14',
                    end: '2016-06-15',
                    url: 'http://helloweba.com/'
                },
                {
                    id:10,
                    title: '实战训练课',
                    start: '2016-06-28',
                }
            ];

//选中事件
function changeState(dom){
    if($(dom).prop("checked")){
        $('#Form').parent().parent().css('height','400px');
        $('#Form').parent().css('height','366px');
        $("#divEndTime").show();
    }else{
        $('#Form').parent().parent().css('height','330px');
        $('#Form').parent().css('height','296px');
        $("#divEndTime").hide();
    }
}
var addIndex;
//打开弹出层
function openLayer(date){
    $("#id").val("");
    $("#del").hide();
    $('#Form')[0].reset();
    $('#endTimeChk').prop("checked",false);
    changeState('#endTimeChk');
    $('#startTime').val(new Date(date).Format("yyyy-MM-dd hh:mm:ss"));
    addIndex=layer.open({
        title : '<i class="fa fa-plus"></i>&nbsp;新增日程',
        type : 1,
        fix : false,
        skin : 'layui-layer-rim',
        // 加上边框
        area : [ '470px', '330px' ],
        // 宽高
        content : $('#Form')
    });
}
function openEditLayer(data){
    $("#del").show();
    $('#Form')[0].reset();
    $('#endTimeChk').prop("checked",false);
    changeState('#endTimeChk');
    $('#Form').autofill(data);
    $('#startTime').val(data.start.Format("yyyy-MM-dd hh:mm:ss"));
    $('#endTime').val(data.start.Format("yyyy-MM-dd hh:mm:ss"));
    /*$('#startTime').val(new Date(date).Format("yyyy-MM-dd hh:mm:ss"));*/
    addIndex=layer.open({
        title : '<i class="fa fa-plus"></i>&nbsp;编辑日程',
        type : 1,
        fix : false,
        skin : 'layui-layer-rim',
        // 加上边框
        area : [ '470px', '330px' ],
        // 宽高
        content : $('#Form')
    });
}
//关闭弹出层
function closeLayer(){
    layer.close(addIndex);
}
//初始化日程视图
function initFullCalendar(){
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: true,//可以拖动   
        firstDay:1,
        timeFormat: 'H:mm',
        axisFormat: 'H:mm',
        events:"",
        // urlRootContext + '/demo/getDataList.do',//
        dayClick: function(date, allDay, jsEvent, view) { //当单击日历中的某一天时，触发callback
            /*var views = $('#calendar').fullCalendar('getView'); */
            console.log(date);
            openLayer(date);
            /*alert("The view's title is " + view.title);
            console.log(this);
            alert('a day has been clicked!');  */ 
        },
        eventClick:function(event, jsEvent, view){//当点击日历中的某一日程（事件）时，触发此操作
            openEditLayer(event);
            console.log(this);
        },
        eventMouseover:function (event, jsEvent, view){//鼠标划过的事件
            console.log(event);
        },eventMouseout:function( event, jsEvent, view ) { //鼠标离开的事件
            console.log(event);
        }
    });
}
//进入下一个月视图
function next(){
    $('#calendar').fullCalendar('next'); 
}
//初始化表单
function initForm(){
    $("#Form").mvalidate({
        type: 1,
        onKeyup: true,
        sendForm: false,
        autoFocus: true,
        firstInvalidFocus: true,
        // 点击提交按钮时,表单通过验证触发函数
//         valid: function(event, options) {

//             //根据自己的编辑添加业务保存数据，不需要参考一下方法，只需要参考我标注的两个方法；
//             if($('#endTimeChk').prop("checked")){
//                 if($('#endTime').val()==null||$('#endTime').val()==''){
//                     layer.msg('<i class="spl-icon-volume-1"></i>&nbsp;请选择结束时间');
//                     return;
//                 }
//             }
//             var obj=$('#Form').serializeObject();
//             if($('#wholeChk').prop("checked")){
//                 obj.allDay=true;
//                 delete obj.end;
//             }else{
//                 obj.allDay=false;
//             }

//             /////////////////////////////////////////
//             //方法二 编辑添加
//             if(obj.id==null||obj.id==''){
//                 dataSource.push(obj);
//             }else{
//                 for (var i = 0; i < dataSource.length; i++) {
//                     if(dataSource[i].id==obj.id){
//                         dataSource.splice(i,1,obj);
//                     }
//                 }
//             }

//             //自己写提交数据库数据，我这里是模拟提交数据
//             //读取的也是本地数据
//             var jsonStr=JSON.stringify(dataSource);
//             $.ajax({//获取数据
//                 type : "POST",
//                 url : urlRootContext + '/demo/addData.do',
//                 data:{jsonStr:jsonStr},
//                 dataType : 'json',
//                 success : function(data) {
// //                  方法一
// //                  if(obj.id==null||obj.id==''){
// //                      //数据入库之后调用一下方法
// //                      $('#calendar').fullCalendar('renderEvent', obj, true);
// //                  }else{
// //                      //数据入库之后调用一下方法
// //                      $('#calendar').fullCalendar('updateEvent', obj);
// //                  }
// //                  方法二
//                     $('#calendar').fullCalendar('refetchEvents'); 
//                     closeLayer();
//                     layer.msg("获取数据成功", { time : 2000});
//                 }
//             });

//         },
        // 点击提交按钮时,表单未通过验证触发函数
        invalid: function(event, status, options) {

        },
        // 点击提交按钮时,表单每个输入域触发这个函数 this 执向当前表单输入域，是jquery对象
        eachField: function(event, status, options) {

        },
        eachValidField: function(val) {},
        eachInvalidField: function(event, status, options) {},
        conditional: {

        },
        descriptions : {
        content : {
            required : '<i class="spl-icon-volume-1"></i>&nbsp;请填写日程内容'
        },
        startTime : {
            required : '<i class="spl-icon-volume-1"></i>&nbsp;请选择开始时间'
        }
        }
    });
}
//初始化datetimepicker日期控件
function initDate(){
    $('#startTime,#endTime').datetimepicker({
        timepicker : true,
        format : 'Y-m-d H:i:s',
        formatDate : 'Y-m-d'
    });
}


// function del(){
//     var id=$("#id").val();
//     for (var i = 0; i < dataSource.length; i++) {
//         if(dataSource[i].id==id){
//             dataSource.splice(i,1);
//             break;
//         }
//     }
//     var jsonStr=JSON.stringify(dataSource);

//     layer.confirm('您确定删除该日程吗?', function(){ 
//         $.ajax({//获取数据
//             type : "POST",
//             url : urlRootContext + '/demo/addData.do',
//             data:jsonStr,
//             dataType : 'json',
//             success : function(data) {
//                 closeLayer();
//                 layer.msg("获取数据成功", { time : 2000});
//                 /////////////////////////////////////////
//                 //方法一
//                  //$('#calendar').fullCalendar('removeEvents', id);
//                 /////////////////////////////////////////
//                 //方法二
//                 $('#calendar').fullCalendar('refetchEvents'); 
//             }
//         });
//     });
// }