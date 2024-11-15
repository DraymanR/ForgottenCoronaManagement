const { connect } = require("../models/index");
const { CoronaDataModel } = require("../models/coronaData.model")

module.exports = class CoronaDataController {
    constructor() {
        connect();
    }

    async getAll() {
        let coronaDatas = await CoronaDataModel.find({}, { _id: 0 });
        // console.log(coronaDatas.vaccinationDates);

        return coronaDatas;
    }

    async getByMemberId(memberId) {
        const coronaData = await CoronaDataModel.findOne({ memberId: memberId });
        if (!coronaData) {
            return { error: 'Member not found' };
        }
        return { _id: coronaData._id.toString(), ...coronaData.toObject() };

    }

    async insert(data) {
        let coronaData = await CoronaDataModel.create(data);
        let result = await CoronaDataModel.findById(coronaData._id, { _id: 0 });
        return result;
    }

    async update(memberId, updatedCoronaData) {
        const coronaData = await CoronaDataModel.findOneAndUpdate(
            { memberId: memberId },
            updatedCoronaData,
            { new: true }
        );
        if (!coronaData) {
            return { error: "Member's corona data not found" };
        }
        return { _id: coronaData._id.toString(), ...coronaData.toObject() };
    }

    async delete(memberId) {
        const coronaData = await CoronaDataModel.findOneAndDelete({ memberId: memberId });
        if (!coronaData) {
            return { error: "Member's corona data not found" };
        }
        return { _id: coronaData._id.toString(), ...coronaData.toObject() };
    }

    async validateById(id) {
        let result = await CoronaDataModel.findOne({ memberId: id });
        return result;
    }

    async countActivePatientsLastMonth() {
        try {
            const currentDate = new Date();
            const thirtyDaysAgo = new Date(currentDate);
            thirtyDaysAgo.setDate(currentDate.getDate() - 30);

            const allCoronaData = await this.getAll();

            const filteredData = allCoronaData.filter(coronaData => {
                const positiveResultDate = new Date(coronaData.positiveResultDate);
                return positiveResultDate >= thirtyDaysAgo && positiveResultDate <= currentDate;
            });


            const result = filteredData.reduce((countsByDay, coronaData) => {
                const dateKey = coronaData.positiveResultDate.toISOString().split('T')[0];
                countsByDay[dateKey] = (countsByDay[dateKey] || 0) + 1;
                return countsByDay;
            }, {});
            console.log("????????");

            console.log(result);
            return result;
        } catch (error) {
            throw new Error('Error counting active patients in the last 30 days: ' + error.message);
        }
    }

    async vaccinatedMembers() {
        console.log("vaccinatedMembers()");
        try {
            const data = await this.getAll();
            const dateCounts = data.reduce((counts, item) => {
                item.vaccinationDates.forEach(vaccination => {
                    const date = vaccination.date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
                    counts[date] = (counts[date] || 0) + 1; // Increment the count for each date
                });
                return counts;
            }, {});

            // // Step 2: Convert to array format (optional, for readability)
            // const result = Object.entries(dateCounts).map(([date, count]) => ({ date, count }));
            // console.log(dateCounts, "dddddddddd");

            // console.log(result, "rrrrrr");
            return dateCounts
        }
        catch (error) {
            return { error: 'Error counting vaccinated members: ' + error.message };
        }
    }
    // async countNotVaccinatedMembers() {
    //     try {
    //         const allCoronaData = await this.getAll();
    //         let nonVaccinatedMembersCount = 0;
    //         allCoronaData.forEach(coronaData => {
    //             if (!coronaData.vaccinationDates || coronaData.vaccinationDates.length === 0) {
    //                 nonVaccinatedMembersCount++;
    //             }
    //         });
    //         return nonVaccinatedMembersCount;

    //     } catch (error) {
    //         return { error: 'Error counting vaccinated members: ' + error.message };
    //     }
    // }

}