package com.winger.service;

import com.winger.entity.Enterprises;

import java.util.List;

public interface EnterprisesService {
    public List<Enterprises> getEnterprises();

   public Enterprises getEnterprisesById(int id);

    public int delEnterprises(Enterprises enterprises);

    public int updateEnterprise(Enterprises enterprise);

    public int insertEnterprise(Enterprises enterprises);

    public List<Enterprises> queryEnterprises(Enterprises enterprises);

    public int queryCounts();

    public int queryCountsBySelect(Enterprises enterprises);
}
