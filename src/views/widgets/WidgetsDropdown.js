import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={<>-- <span className="fs-6 fw-normal">(-- <CIcon icon={cilArrowBottom} />)</span></>}
          title="none"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>none</CDropdownItem>
                <CDropdownItem>none </CDropdownItem>
                <CDropdownItem>none</CDropdownItem>
                <CDropdownItem disabled>none</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              ref={widgetChartRef1}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: [],
                datasets: [
                  {
                    label: 'Dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: [],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: { display: false },
                },
                maintainAspectRatio: false,
                scales: {
                  x: { grid: { display: false }, ticks: { display: false } },
                  y: { display: false },
                },
                elements: { line: { borderWidth: 1 }, point: { radius: 4 } },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="info"
          value={<>-- <span className="fs-6 fw-normal">(-- <CIcon icon={cilArrowTop} />)</span></>}
          title="none"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>none</CDropdownItem>
                <CDropdownItem>none </CDropdownItem>
                <CDropdownItem>none</CDropdownItem>
                <CDropdownItem disabled>none</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              ref={widgetChartRef2}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: [],
                datasets: [
                  {
                    label: 'Dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: [],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: { display: false },
                },
                maintainAspectRatio: false,
                scales: {
                  x: { grid: { display: false }, ticks: { display: false } },
                  y: { display: false },
                },
                elements: { line: { borderWidth: 1 }, point: { radius: 4 } },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="warning"
          value={<>-- <span className="fs-6 fw-normal">(-- <CIcon icon={cilArrowTop} />)</span></>}
          title="none"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>none</CDropdownItem>
                <CDropdownItem>none </CDropdownItem>
                <CDropdownItem>none</CDropdownItem>
                <CDropdownItem disabled>none</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: [],
                datasets: [
                  {
                    label: 'Dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: { display: false },
                },
                maintainAspectRatio: false,
                scales: {
                  x: { display: false },
                  y: { display: false },
                },
                elements: { line: { borderWidth: 2 } },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="danger"
          value={<>-- <span className="fs-6 fw-normal">(-- <CIcon icon={cilArrowBottom} />)</span></>}
          title="none"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>none</CDropdownItem>
                <CDropdownItem>none </CDropdownItem>
                <CDropdownItem>none</CDropdownItem>
                <CDropdownItem disabled>none</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: [],
                datasets: [
                  {
                    label: 'Dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  x: { grid: { display: false }, ticks: { display: false } },
                  y: { display: false },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
}

export default WidgetsDropdown
