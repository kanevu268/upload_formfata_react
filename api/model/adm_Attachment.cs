using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

public class adm_Attachment
{

    public int? ATTACHMENT_ID { get; set; }
    public string FILE_NAME { get; set; }
    public int? REF_CODE_ID { get; set; }//nhom tai lieu
    public string REF_CODE_CODE { get; set; }//ma nhom tai lieu
    public string REF_CODE_NAME { get; set; }//ten nhom tai lieu
    public int? STATUS { get; set; }
    public double? FILE_SIZE { get; set; }
    public string DISPLAY_NAME { get; set; }
    public string FILE_CONTENT_TYPE { get; set; }
    public int? ECM_ITEM_ID { get; set; }
    public int? APPLICATION_ID { get; set; }
    public string DESCRIPTION { get; set; }
    public string SUB_CODE { get; set; }
    public string FileContentString { get; set; }
    public string GuidID { get; set; }

    public string Url { get; set; }
    public IFormFile File { get; set; }
    public List<IFormFile> Files { get; set; }
}