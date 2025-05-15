import { FieldId } from "src/core/field/domain/Field";
import { AnalysisValidatorFactory } from "./AnalysisValidator";
import { ExpectedProductivity, Liming, Nitrogen, Phosphor, Potassium, RelativeTotalNeutralizingPower, TotalCationExchangeCapacity, DesiredBaseSaturation, CurrentBaseSaturation } from './indexVo'
import { Uuid } from "src/core/shared/domain/value-objects/UuidVo";
import { Entity } from "src/core/shared/domain/Entity";
import { ValueObject } from "src/core/shared/domain/ValueObject";

export type AnalysisCreateProps = {
    fieldId?: FieldId
    desiredBaseSaturation?: DesiredBaseSaturation
    currentBaseSaturation?: CurrentBaseSaturation
    totalCationExchangeCapacity?: TotalCationExchangeCapacity
    relativeTotalNeutralizingPower?: RelativeTotalNeutralizingPower
    liming?: Liming
    phosphor?: Phosphor
    potassium?: Potassium
    expectedProductivity?: ExpectedProductivity
    nitrogen?: Nitrogen
    isActive: boolean
}

export type AnalysisConstructorProps = {
    analysisId?: AnalysisId
    fieldId?: FieldId
    desiredBaseSaturation?: DesiredBaseSaturation
    currentBaseSaturation?: CurrentBaseSaturation
    totalCationExchangeCapacity?: TotalCationExchangeCapacity
    relativeTotalNeutralizingPower?: RelativeTotalNeutralizingPower
    liming?: Liming
    phosphor?: Phosphor
    potassium?: Potassium
    expectedProductivity?: ExpectedProductivity
    nitrogen?: Nitrogen
    isActive: boolean
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export class AnalysisId extends Uuid { }

export class Analysis extends Entity {

    private analysisId: AnalysisId
    private fieldId: FieldId
    private desiredBaseSaturation?: DesiredBaseSaturation
    private currentBaseSaturation?: CurrentBaseSaturation
    private totalCationExchangeCapacity?: TotalCationExchangeCapacity
    private relativeTotalNeutralizingPower?: RelativeTotalNeutralizingPower
    private liming?: Liming
    private phosphor?: Phosphor
    private potassium?: Potassium
    private expectedProductivity?: ExpectedProductivity
    private nitrogen?: Nitrogen
    private isActive: boolean
    private createdAt: Date
    private updatedAt: Date
    private deletedAt: Date | null

    constructor(props: AnalysisConstructorProps) {
        super()
        this.analysisId = props.analysisId ? props.analysisId : new AnalysisId()
        this.fieldId = props.fieldId ?? null
        this.desiredBaseSaturation = props.desiredBaseSaturation
        this.currentBaseSaturation = props.currentBaseSaturation
        this.totalCationExchangeCapacity = props.totalCationExchangeCapacity
        this.relativeTotalNeutralizingPower = props.relativeTotalNeutralizingPower
        this.liming = props.liming
        this.phosphor = props.phosphor
        this.potassium = props.potassium
        this.expectedProductivity = props.expectedProductivity
        this.nitrogen = props.nitrogen
        this.isActive = props.isActive
        this.createdAt = props.createdAt
        this.updatedAt = props.updatedAt
        this.deletedAt = props.deletedAt
    }

    static create(props: AnalysisCreateProps) {

        const analysis = new Analysis(props)

        analysis.validate()

        return analysis
    }

    public validate(fields?: string[]) {

        const analysisValidator = AnalysisValidatorFactory.create()

        return analysisValidator.validate(this.notification, this, fields)

    }

    public calculateNpk() {

        const expectedProductivity = this.expectedProductivity.getValue

        if (expectedProductivity > 50) {

            this.nitrogen = new Nitrogen(410)

            const potassium = this.potassium.getValue

            const phosphor = this.phosphor.getValue

            if (potassium) {
                this.potassium = new Potassium(800)
            }

            if (potassium >= 1.6 && potassium <= 3.0) {
                this.potassium = new Potassium(950)
            }

            if (potassium > 3.0) {
                this.potassium = new Potassium(750)
            }

            if (phosphor < 16) {
                this.phosphor = new Phosphor(240)
            }

            if (phosphor > 16 && phosphor <= 40) {
                this.phosphor = new Phosphor(150)
            }

            if (phosphor > 40) {
                this.phosphor = new Phosphor(120)
            }
        } else if (expectedProductivity >= 40 && expectedProductivity <= 50) {

            const potassium = this.potassium.getValue

            const phosphor = this.phosphor.getValue

            this.nitrogen = new Nitrogen(410)
            
            if (potassium < 1.6) {
                this.potassium = new Potassium(800)
            }

            if (potassium >= 1.6 && potassium <= 3.0) {
                this.potassium = new Potassium(750)
            }

            if (potassium > 3.0) {
                this.potassium = new Potassium(550)
            }

            if (phosphor < 16) {
                this.phosphor = new Phosphor(220)
            }

            if (phosphor > 16 && phosphor <= 40) {
                this.phosphor = new Phosphor(130)
            }

            if (phosphor > 40) {
                this.phosphor = new Phosphor(110)
            }

        } else if (expectedProductivity >= 30 && expectedProductivity < 40) {

            const potassium = this.potassium.getValue

            const phosphor = this.phosphor.getValue

            this.nitrogen = new Nitrogen(260)

            if (potassium < 1.6) {
                this.potassium = new Potassium(800)
            }

            if (potassium >= 1.6 && potassium <= 3.0) {
                this.potassium = new Potassium(550)
            }

            if (potassium > 3.0) {
                this.potassium = new Potassium(350)
            }
            if (phosphor < 16) {
                this.potassium = new Potassium(200)
            }

            if (phosphor > 16 && phosphor <= 40) {
                this.phosphor = new Phosphor(110)
            }

            if (phosphor > 40) {
                this.phosphor = new Phosphor(80)
            }
        } else if (expectedProductivity >= 20 && expectedProductivity < 30) {
            this.set('nitrogen', 190)
            if (potassium < 1.6) {
                this.set('potassium', 600)
            }

            if (potassium >= 1.6 && potassium <= 3.0) {
                this.set('potassium', 350)
            }

            if (potassium > 3.0) {
                this.set('potassium', 150)
            }
            if (phosphor < 16) {
                this.set('phosphor', 180)
            }

            if (phosphor > 16 && phosphor <= 40) {
                this.set('phosphor', 90)
            }

            if (phosphor > 40) {
                this.set('phosphor', 60)
            }
        } else {
            this.set('nitrogen', 110)
            if (potassium < 1.6) {
                this.set('potassium', 400)
            }

            if (potassium >= 1.6 && potassium <= 3.0) {
                this.set('potassium', 150)
            }

            if (potassium > 3.0) {
                this.set('potassium', 100)
            }

            if (phosphor < 16) {
                this.set('phosphor', 160)
            }

            if (phosphor > 16 && phosphor <= 40) {
                this.set('phosphor', 70)
            }

            if (phosphor > 40) {
                this.set('phosphor', 40)
            }
        }
    }

    get getId(): AnalysisId {
        return this.analysisId
    }

    toJSON() {
        return {
            analysisId: this.analysisId.id,
            fieldId: this.fieldId.id,
            desiredBaseSaturation: this.desiredBaseSaturation.getValue,
            currentBaseSaturation: this.currentBaseSaturation.getValue,
            totalCationExchangeCapacity: this.totalCationExchangeCapacity.getValue,
            relativeTotalNeutralizingPower: this.relativeTotalNeutralizingPower.getValue,
            liming: this.liming.getValue,
            phosphor: this.phosphor.getValue,
            potassium: this.potassium.getValue,
            expectedProductivity: this.expectedProductivity.getValue,
            nitrogen: this.nitrogen.getValue,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt
        }
    }

}