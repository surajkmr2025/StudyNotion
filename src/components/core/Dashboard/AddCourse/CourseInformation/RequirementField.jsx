import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {
    const [requirement, setRequirement] = useState("")
    const [requirementList, setRequirementList] = useState([])
    const { editCourse, course } = useSelector((state) => state.course)

    // ─── Populate list from existing course data when editing ─────────────────
    useEffect(() => {
        // Register the field with react-hook-form so it participates in validation
        register(name, { required: true })

        // ✅ FIX: Moved editCourse population INTO this one-time setup effect.
        // Previously the population lived in the second useEffect that runs
        // whenever `requirementList` changes.  That caused an infinite loop:
        //   requirementList changes → useEffect fires → sets requirementList again → repeat.
        // By populating once here (on mount) and NOT including it in the
        // requirementList effect, we break the cycle entirely.
        if (editCourse && course?.instructions) {
            setRequirementList(course.instructions)
            setValue(name, course.instructions)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // empty deps = runs once on mount

    // ─── Sync requirementList into the react-hook-form field value ────────────
    useEffect(() => {
        // Only update the form value — do NOT set requirementList here,
        // which would create the infinite loop described above.
        setValue(name, requirementList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requirementList])

    const handleAddRequirement = () => {
        const trimmed = requirement.trim()
        if (!trimmed) return // ignore empty / whitespace-only input

        setRequirementList((prev) => [...prev, trimmed])

        // ✅ FIX: `setRequirement("")` was commented out.
        // The input never cleared after clicking Add, so users had to
        // manually delete the previous requirement before typing a new one.
        setRequirement("")
    }

    // ✅ Enhancement: also add on Enter key so the form is keyboard-friendly
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault() // prevent accidental form submission
            handleAddRequirement()
        }
    }

    const handleRemoveRequirement = (index) => {
        setRequirementList((prev) => prev.filter((_, i) => i !== index))
    }

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor={name}>
                {label}
                <sup className="text-pink-200">*</sup>
            </label>

            <div className="flex gap-x-3">
                <input
                    type="text"
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter a requirement and click Add"
                    className="form-style flex-1"
                    style={{
                        padding: '12px 16px',
                        fontSize: '14px',
                        color: '#F1F2FF',
                        backgroundColor: '#161D29',
                        border: '1px solid #2C333F',
                        borderRadius: '8px',
                        outline: 'none',
                    }}
                />
                <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="mt-1 rounded-md border border-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-50 hover:bg-yellow-50 hover:text-richblack-900 transition-all"
                >
                    Add
                </button>
            </div>

            {requirementList.length > 0 && (
                <ul className="mt-2 list-inside list-disc space-y-1">
                    {requirementList.map((item, index) => (
                        <li key={index} className="flex items-center gap-x-2 text-richblack-5">
                            <span className="text-sm">{item}</span>
                            <button
                                type="button"
                                onClick={() => handleRemoveRequirement(index)}
                                className="text-xs text-pink-300 hover:text-pink-200 transition-colors"
                            >
                                remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )}
        </div>
    )
}

export default RequirementField
