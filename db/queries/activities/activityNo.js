const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('activities')
        .leftJoin(
            'service_reports',
            'activities.timeOuts',
            '=', 'service_reports.timeOuts'
        )
        .join(
            'client', //client.accountName
            'activities.client',
             '=', 'client.accountName'
        )
        .select(
            'activities.activityNo', 
            knex.raw(
                `concat_ws(' - ', date_part('year', ??)::text, ??::text) as glocal_id`,
                ['activities.timeIn', 'activities.trackingNo']
            ),
            'activities.trackingNo AS glocalId', 
            knex.raw(
                `concat_ws(' - ', date_part('year', ??)::text, ??::text) as sr_number_year`,
                ['activities.timeIn', 'service_reports.sr_number']
            ),
            'service_reports.sr_number',
            'activities.productName', 
            'activities.client', 
            'activities.addres AS address',
            //'contact_person.personName', 
            'activities.typeOfActivity',
            'activities.purposeOfVisit', 
            'activities.activityPerformed', 
            'activities.nextActivity', 
            'activities.recommendations', 
            'activities.timeIn', 
            'service_reports.timeOuts', 
            'activities.assignedSystemsEngineer',
            'activities.point_person'
        )
        .orderBy('activities.activityNo', 'desc');
    },
    getOne(activityNo) {
        return knex('activities')
        .leftJoin(
            'service_reports',
            'activities.timeOuts',
            '=', 'service_reports.timeOuts'
        )
        .join(
            'client', 
            'activities.client', 
            '=', 'client.accountName'
        )
        .select(
            'activities.activityNo', 
            knex.raw(
                `concat_ws(' - ', date_part('year', ??)::text, ??::text) as glocal_id`,
                ['activities.timeIn', 'activities.trackingNo']
            ),
            'activities.trackingNo AS glocalId', 
            knex.raw(
                `concat_ws(' - ', date_part('year', ??)::text, ??::text) as sr_number_year`,
                ['activities.timeIn', 'service_reports.sr_number']
            ),
            'service_reports.sr_number',
            'activities.productName', 
            'activities.client', 
            'activities.addres AS address',
            //'contact_person.personName', 
            'activities.typeOfActivity',
            'activities.purposeOfVisit', 
            'activities.activityPerformed', 
            'activities.nextActivity', 
            'activities.recommendations', 
            'activities.timeIn', 
            'activities.timeOuts', 
            'activities.assignedSystemsEngineer',
            'activities.point_person'
        )
        .where('activityNo', activityNo)
        .orderBy('activities.activityNo', 'asc');
    },
    create(activity) {
        return knex('activities').insert(activity, '*');
    },
    update(activityNo, activity) {
        return knex('activities').where('activityNo', activityNo).update(activity, '*');
    }, 
    delete(activityNo) {
        return knex('activities').where('activityNo', activityNo).del();
    }
}