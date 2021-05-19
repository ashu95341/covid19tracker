import { Card , CardContent, Typography} from '@material-ui/core'
import React from 'react'


function InfoBox({title, cases, total}) {
    return (
        <div>
            <Card className="infoBox">
                <CardContent>
                    {/* title */}
                    <Typography className="infoBox_title" color="textSecondary">
                        {title}
                    </Typography>
                    <h2 className="infobox_cases">{cases}</h2>
                    {/* casses */}
                    <Typography className="infoBox_total" color="textSecondary">
                        {total} Total
                    </Typography>
                    {/* total */}

                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox
