﻿using System.Web;
using System.Web.Mvc;

namespace RealEstateAgencyApp.Asp.NetWebApi
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
