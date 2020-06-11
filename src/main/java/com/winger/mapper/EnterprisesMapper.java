package com.winger.mapper;

import java.util.List;

import com.winger.entity.Enterprises;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface EnterprisesMapper {

    public List<Enterprises> getEnterprises();

    public Enterprises getEnterprisesById(int id);

    public List<Enterprises> queryEnterprises(Enterprises enterprises);

    public int delEnterprises(Enterprises enterprises);

    public int updateEnterprise(Enterprises Enterprise);

    public int insertEnterprise(Enterprises enterprises);

    public int queryCounts();

    public int queryCountsBySelect(Enterprises enterprises);
}
