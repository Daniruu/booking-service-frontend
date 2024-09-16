import React, { useState, useEffect } from 'react';
import BusinessServiceRow from '../BusinessServiceRow/BusinessServiceRow';
import { RiArrowDropDownLine, RiArrowDropUpLine  } from "react-icons/ri";
import './ServiceList.css';

const ServiceList = ({ services, onServiceClick, onFeatureClick}) => {
    const [openGroups, setOpenGroups] = useState({});

    const groupServicesByGroup = (services) => {
        return services.reduce((groups, service) => {
            const group = service.group;
            if (!groups[group]) {
                groups[group] = [];
            }
            groups[group].push(service);
            return groups;
        }, {});
    };

    const getGroupKeys = (groupedServices) => {
        const groupKeys = Object.keys(groupedServices);
        return groupKeys.filter(group => group !== 'Pozostałe usługi').concat('Pozostałe usługi');
    };

    useEffect(() => {
        const groupedServices = groupServicesByGroup(services);
        const initialOpenGroups = Object.keys(groupedServices).reduce((acc, group) => {
            acc[group] = true; 
            return acc;
        }, {});
        setOpenGroups(initialOpenGroups);
    }, [services]);

    const toggleGroup = (group) => {
        setOpenGroups((prevOpenGroups) => ({
            ...prevOpenGroups,
            [group]: !prevOpenGroups[group],
        }));
    };

    const groupedServices = groupServicesByGroup(services);
    const sortedGroupKeys = getGroupKeys(groupedServices);

    return (
        <div className='service-list'>
            {sortedGroupKeys.map((group, index) => (
                <div key={index} className='service-group'>
                    <h3
                        onClick={() => toggleGroup(group)}
                        style={{ cursor: 'pointer' }}
                    >
                        {group} {openGroups[group] ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
                    </h3>
                    {openGroups[group] && (
                        groupedServices[group].map((service, serviceIndex) => (
                            <BusinessServiceRow
                                key={serviceIndex}
                                serviceName={service.name}
                                servicePrice={service.price}
                                serviceDuration={service.duration}
                                isFeatured ={service.isFeatured}
                                onClick={() => onServiceClick(service)}
                                onFeautureClick={() => onFeatureClick(service)}
                            />
                        ))
                    )}
                </div>
            ))}
        </div>
    );
}

export default ServiceList;