package com.winger.service.impl;

import java.util.List;

import com.winger.entity.Enterprises;
import com.winger.mapper.EnterprisesMapper;
import com.winger.service.EnterprisesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnterprisesServiceImpl implements EnterprisesService {

    @Autowired
    private EnterprisesMapper enterprisesMapper;

    @Override
    public List<Enterprises> getEnterprises() {
        List<Enterprises> enterprisesList = enterprisesMapper.getEnterprises();
        return enterprisesList;
    }

   @Override
   public Enterprises getEnterprisesById(int id) {
       Enterprises enterprises = enterprisesMapper.getEnterprisesById(id);
       return enterprises;
   }

    @Override
    public int delEnterprises(Enterprises enterprises) {
        return enterprisesMapper.delEnterprises(enterprises);
    }

    @Override
    public int updateEnterprise(Enterprises enterprises) {
        return enterprisesMapper.updateEnterprise(enterprises);
    }

    @Override
    public int insertEnterprise(Enterprises enterprises) {
        return enterprisesMapper.insertEnterprise(enterprises);
    }

    @Override
    public List<Enterprises> queryEnterprises(Enterprises enterprises) {
        return enterprisesMapper.queryEnterprises(enterprises);
    }

    @Override
    public int queryCounts() {
        return enterprisesMapper.queryCounts();
    };

    @Override
    public int queryCountsBySelect(Enterprises enterprises) {
        return enterprisesMapper.queryCountsBySelect(enterprises);
    };
}
