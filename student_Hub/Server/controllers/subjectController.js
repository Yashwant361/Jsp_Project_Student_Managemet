const SUBJECT = require("../models/subjectMOdel");


const handleAddSubject = async (req, res) => {
    const { _id } = req.payload;
    if (req.body == undefined) {
        return res.status(400).json({ message: "details are mandatory to add a subject" });
    }

    const { subject } = req.body;
    if (subject == "") {
        return res.status(400).json({ message: "Input field is mandatory" });
    }
    try {
        const stdSubjects = await SUBJECT.find({ stdId: _id });

        const isStdSubject = stdSubjects.find((detail) => detail.subject == subject);
        if (isStdSubject) {
            return res.status(400).json({ message: "you alredy added this subject" });
        }

        await SUBJECT.insertOne({ subject, stdId: _id });

        return res.status(201).json({ message: `${subject} added for you` });
    } catch (error) {
        return res.status(500).json({ message: "inernal server error" })
    }
}

const handleGetAllSubject = async (req, res) => {
    try {
        const { _id } = req.payload;
        const allSubjects = await SUBJECT.find({ stdId: _id });
        return res.status(200).json({ allSubjects });
    } catch (error) {
        return res.status(500).json({ message: "inernal server error" })
    }
}

const handleRemoveSubject = async (req, res) => {
    try {
        const { id } = req.params;
        await SUBJECT.deleteOne({ _id: id });
        return res.status(200).json({ message: "subject removed successfully" })
    } catch (error) {
        return res.status(500).json({ message: "inernal server error" })

    }
}

const handleupdateSubject = async (req, res) => {
    const { _id } = req.payload;
    const { subjectId } = req.params;
    const { subject } = req.body;

    if (!subject || subject.trim() === '') {
        return res.status(400).json({ message: 'Subject name is required' });
    }

    try {
        // check duplicate
        const existing = await SUBJECT.findOne({
            stdId: _id,
            subject
        });

        if (existing) {
            return res.status(400).json({ message: 'Subject already exists' });
        }

        const updated = await SUBJECT.findOneAndUpdate(
            { _id: subjectId, stdId: _id },
            { subject },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        return res.status(200).json({
            message: 'Subject updated successfully',
            updated
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = {
    handleAddSubject,
    handleGetAllSubject,
    handleRemoveSubject,
    handleupdateSubject
}