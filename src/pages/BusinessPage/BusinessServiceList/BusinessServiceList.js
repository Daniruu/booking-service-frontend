import React, { useState, useEffect } from 'react';
import BusinessPageServiceRow from '../BusinessPageServiceRow/BusinessPageServiceRow';
import { RiArrowDropDownLine, RiArrowDropUpLine  } from "react-icons/ri";
import './BusinessServiceList.css';

const BusinessServiceList = ({ services, handleServiceClick}) => {
    const [openGroups, setOpenGroups] = useState({});
    const featuredServices = services.filter(service => service.isFeatured);
    const [featuredServiceOpen, setFeaturedServiceOpen] = useState(true);

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

    const toggleFeaturedServiceOpen = () => {
        setFeaturedServiceOpen(!featuredServiceOpen);
    };

    const groupedServices = groupServicesByGroup(services);
    const sortedGroupKeys = getGroupKeys(groupedServices);

    return (
        <div className='business-service-list'>
            <h2>Usługi</h2>
            {featuredServices.length > 0 && (
                <div className='business-service-group'>
                    <h3
                        onClick={() => toggleFeaturedServiceOpen()}
                        style={{ cursor: 'pointer' }}
                    >
                        Popularne usługi {featuredServiceOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
                    </h3>
                    {featuredServiceOpen && (
                        featuredServices.map((service, index) => (
                            <BusinessPageServiceRow
                                key={`featured-${index}`}
                                service={service}
                                onClick={() => handleServiceClick(service)}
                            />
                        ))
                    )}
                </div>
            )}

            {sortedGroupKeys.map((group, index) => (
                <div key={index} className='service-group'>
                    <h2
                        onClick={() => toggleGroup(group)}
                        style={{ cursor: 'pointer' }}
                    >
                        {group} {openGroups[group] ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
                    </h2>
                    {openGroups[group] && (
                        groupedServices[group].map((service, serviceIndex) => (
                            <BusinessPageServiceRow
                                key={serviceIndex}
                                service={service}
                                onClick={() => handleServiceClick(service)}
                            />
                        ))
                    )}
                </div>
            ))}
        </div>
    );
}

export default BusinessServiceList;