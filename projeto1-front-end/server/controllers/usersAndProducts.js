'use strict';
const usersModel = require('../models/users');
const productsModel = require('../models/products');

/**
 * @function 
 * @param{array} - array to be checked if the new id is a duplicate or not
 * @param{number} - type of the obj to be checked
 * @param{number} - new object id 
 * */
function checkDuplicate(checkObj, type, newId) {
    for (let i = 0; i < checkObj.length; i++) {
        let curId = checkObj[i][type];
        if (curId === newId)
            return false;
    }
    return true;
}
exports.listUsersAndProducts = async function (req, res) {
    let userResult = await usersModel();
    let productResult = await productsModel();
    // Windows ---> usersTable and productsTable
    let windowResult = { usersData: [], productsData: [] };

    // user data controll
    if (!userResult.err) {
        let jobs = [];
        let cars = [];
        let access = [];
        let address = [];
        let products = [];
        userResult.data.map(user => {
            let jobId = user.job_id || null;
            let carId = user.car_id || null;
            let accessId = user.access_id || null;
            let addressId = user.address_id || null;
            let productId = user.product_id || null;

            let jobTitle;
            let salary;
            let jobAddress;
            let userId = user.user_id;
            let carName;
            let type;
            let model;
            let fuel;
            let manufacturer;

            let businessTechnology;
            let ipAddress;
            let macAddress;
            let userAgent;
            let userLogin;

            let streetAddress;
            let streetName;
            let streetSufix;
            let city;
            let direction;
            let state;
            let cityPrefix;
            let secondaryAddress;

            let buyedAppliance;
            let buyedBussinessTechnology;
            let buyedCommerceDepartment;
            let companyName;
            let productName;
            let description;
            let material;
            let price;
            let buyedBussinessIndustry;


            if (jobId) {
                jobId = user.job_id;
                jobTitle = user.title.replace(/\s+/g, ' ').trim();
                salary = user.currency_symbol.replace(/\s+/g, ' ').trim() + " " + user.salary;
                jobAddress = user.job_address.replace(/\s+/g, ' ').trim();
            }
            if (carId) {
                carName = user.car_name.replace(/\s+/g, ' ').trim();
                type = user.car_type.replace(/\s+/g, ' ').trim();
                model = user.model.replace(/\s+/g, ' ').trim();
                fuel = user.fuel.replace(/\s+/g, ' ').trim();
                manufacturer = user.manufacturer.replace(/\s+/g, ' ').trim();
            }

            if (accessId) {
                businessTechnology = user.business_technology.replace(/\s+/g, ' ').trim();
                ipAddress = user.ip_address.replace(/\s+/g, ' ').trim();
                macAddress = user.mac_address.replace(/\s+/g, ' ').trim();
                userAgent = user.user_agent.replace(/\s+/g, ' ').trim();
                userLogin = user.user_login.replace(/\s+/g, ' ').trim();
            }

            if (addressId) {
                streetAddress = user.street_address.replace(/\s+/g, ' ').trim();
                streetName = user.street_name.replace(/\s+/g, ' ').trim();
                streetSufix = user.street_sufix.replace(/\s+/g, ' ').trim();
                city = user.city.replace(/\s+/g, ' ').trim();
                direction = user.direction.replace(/\s+/g, ' ').trim();
                state = user.state.replace(/\s+/g, ' ').trim();
                cityPrefix = user.city_prefix.replace(/\s+/g, ' ').trim();
                secondaryAddress = user.secondary_address.replace(/\s+/g, ' ').trim();
            }

            if (productId) {
                buyedAppliance = user.buyed_appliance.replace(/\s+/g, ' ').trim();
                buyedBussinessTechnology = user.buyed_bussiness_tecnology.replace(/\s+/g, ' ').trim();
                buyedCommerceDepartment = user.buyed_commerce_department.replace(/\s+/g, ' ').trim();
                companyName = user.company_name.replace(/\s+/g, ' ').trim();
                productName = user.product_name.replace(/\s+/g, ' ').trim();
                description = user.description.replace(/\s+/g, ' ').trim();
                material = user.material.replace(/\s+/g, ' ').trim();
                price = user.price;
                buyedBussinessIndustry = user.buyed_bussiness_industry.replace(/\s+/g, ' ').trim();
            }
            // if is a new user
            if (!windowResult.usersData[userId]) {
                let userName = user.name.replace(/\s+/g, ' ').trim();
                let date = JSON.stringify(user.birth_date);
                let year = date.substr(1, 4);
                let month = date.substr(6, 2);
                let day = date.substr(9, 2);
                let hour = date.substr(12, 2);
                let minutes = date.substr(15, 2);
                let seconds = date.substr(18, 2);
                let userBirthDate = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;

                products = [{ productId, buyedAppliance, buyedBussinessTechnology, buyedCommerceDepartment, companyName, productName, description, material, price, buyedBussinessIndustry }]
                address = [{ addressId, streetAddress, streetName, streetSufix, city, direction, state, cityPrefix, secondaryAddress }]
                access = [{ accessId, businessTechnology, ipAddress, macAddress, userAgent, userLogin }]
                jobs = [{ jobId, jobTitle, salary, jobAddress }];
                cars = [{ carId, carName, type, fuel, manufacturer, model }]
                windowResult.usersData[userId] = { userId, userName, userBirthDate, jobs, cars, access, address, products };
            }
            // if user already exists, new job and salary 
            else {
                // if there is a new job push it
                if (checkDuplicate(windowResult.usersData[userId].jobs, "jobId", jobId))
                    windowResult.usersData[userId].jobs.push({ jobId, jobTitle, salary, jobAddress });
                else if (checkDuplicate(windowResult.usersData[userId].cars, "carId", carId))
                    windowResult.usersData[userId].cars.push({ carId, carName, type, fuel, manufacturer, model });
                else if (checkDuplicate(windowResult.usersData[userId].access, "accessId", accessId))
                    windowResult.usersData[userId].access.push({ accessId, businessTechnology, ipAddress, macAddress, userAgent, userLogin });
                else if (checkDuplicate(windowResult.usersData[userId].address, "addressId", addressId))
                    windowResult.usersData[userId].address.push({ addressId, streetAddress, streetName, streetSufix, city, direction, state, cityPrefix, secondaryAddress });
                else if (checkDuplicate(windowResult.usersData[userId].products, "productsId", productId))
                    windowResult.usersData[userId].products.push({ productId, buyedAppliance, buyedBussinessTechnology, buyedCommerceDepartment, companyName, productName, description, material, price, buyedBussinessIndustry });
            }
        })
    }
    else {
        windowResult.usersData = userResult;
    }

    // Products data controller
    if (!productResult.err) {
        let consumers = [];
        let consumerName;
        let date;
        let year;
        let month;
        let day;
        let hour;
        let minutes;
        let seconds;
        let consumerBirthDate;
        productResult.data.map(product => {
            let productId = product.product_id;
            let consumerId = product.user_id || null;
            if (consumerId) {
                consumerName = product.name.replace(/\s+/g, ' ').trim();
                date = JSON.stringify(product.birth_date);
                year = date.substr(1, 4);
                month = date.substr(6, 2);
                day = date.substr(9, 2);
                hour = date.substr(12, 2);
                minutes = date.substr(15, 2);
                seconds = date.substr(18, 2);
                consumerBirthDate = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;
            }
            if (!windowResult.productsData[productId]) {
                consumers = [{ consumerId, consumerName, consumerBirthDate }];
                let buyedAppliance = product.buyed_appliance.replace(/\s+/g, ' ').trim();
                let buyedBussinessTechnology = product.buyed_bussiness_tecnology.replace(/\s+/g, ' ').trim();
                let buyedCommerceDepartment = product.buyed_commerce_department.replace(/\s+/g, ' ').trim();
                let companyName = product.company_name.replace(/\s+/g, ' ').trim();
                let productName = product.product_name.replace(/\s+/g, ' ').trim();
                let description = product.description.replace(/\s+/g, ' ').trim();
                let material = product.material.replace(/\s+/g, ' ').trim();
                let price = product.price;
                let buyedBussinessIndustry = product.buyed_bussiness_industry.replace(/\s+/g, ' ').trim();
                windowResult.productsData[productId] = { productId, buyedAppliance, buyedBussinessTechnology, buyedCommerceDepartment, companyName, productName, description, material, price, buyedBussinessIndustry, consumers };
            }
            else if (checkDuplicate(windowResult.productsData[productId].consumers, "consumerId", consumerId))
                windowResult.productsData[productId].consumers.push({ consumerId, consumerName, consumerBirthDate });
        })
    }
    res.json(windowResult);
};