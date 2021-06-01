var M=require("ming_node");

const ming_xxl_job={};
ming_xxl_job.xxl_job_host="http://localhost:8080/"


ming_xxl_job.stopJobInfoById=async function (id){
    r= await M.post(ming_xxl_job.xxl_job_host+"/jobinfo/stop",{id:id},{
        "Content-Type":"application/x-www-form-urlencoded; ",
        "XXL-JOB-ACCESS-TOKEN":""
    })
    return r;
}


ming_xxl_job.startJobInfoById=async function (id){
    r= await M.post(ming_xxl_job.xxl_job_host+"/jobinfo/start",{id:id},{
        "Content-Type":"application/x-www-form-urlencoded; ",
        "XXL-JOB-ACCESS-TOKEN":""
    })
    return r;
}


ming_xxl_job.triggerJobInfoById=async function (id,executorParam){
    r= await M.post(ming_xxl_job.xxl_job_host+"/jobinfo/trigger",{id:id,executorParam:executorParam},{
        "Content-Type":"application/x-www-form-urlencoded; ",
        "XXL-JOB-ACCESS-TOKEN":""
    })
    return r;
}

ming_xxl_job.getJobAttribute=async function (id,key){
    r= await ming_xxl_job.doSql(`SELECT field_value FROM xxl_job_info_db WHERE job_info_id=${id} and field_key="${key}"`)
    if(r.content.length){
        return r.content[0]["field_value"];
    }
    return null;
}

ming_xxl_job.setJobAttribute=async function (id,key,value){
    r= await ming_xxl_job.doSql(`REPLACE INTO xxl_job_info_db (job_info_id,field_key,field_value,update_time) VALUES (${id},'${key}','${value}',now())`)
    return r;
}

ming_xxl_job.updateJobInfo=async function (id,jobInfo){
    r= await M.post(ming_xxl_job.xxl_job_host+"/jobinfo/update",{
        "jobDesc": jobInfo.jobDesc||"寤舵椂瑙﹀彂鎵ц鍣ㄦ墽琛�",
        "author": jobInfo.author||"XXL",
        "jobGroup": jobInfo.jobGroup||1,
        "scheduleType": jobInfo.scheduleType||"CRON",
        "scheduleConf": jobInfo.cron|| "* 2 * * * ?",
        "cronGen_display": jobInfo.cron|| "* 2 * * * ?",
        "schedule_conf_CRON": jobInfo.cron|| "* 2 * * * ?",
        "executorRouteStrategy": jobInfo.executorRouteStrategy|| "FIRST",
        "misfireStrategy": "DO_NOTHING",
        "executorBlockStrategy": "SERIAL_EXECUTION",
        "executorTimeout": 0,
        "executorFailRetryCount": 0,
        id: id
    },{
        "Content-Type":"application/x-www-form-urlencoded;",
        "XXL-JOB-ACCESS-TOKEN":""
    })
    return r;
}


ming_xxl_job.doSql=async function (sql){

    r= await M.post(ming_xxl_job.xxl_job_host+"/doSql",{sql:sql},{
        "Content-Type":"application/x-www-form-urlencoded; ",
        "XXL-JOB-ACCESS-TOKEN":""
    })
    return r;
}



module.exports =ming_xxl_job;